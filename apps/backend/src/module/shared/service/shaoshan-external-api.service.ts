import { Inject, Injectable, Logger } from '@nestjs/common'
import axios from 'axios'
import { shaoshanConfig } from '../../core/config/shaoshan.config'
import { ConfigType } from '@nestjs/config'
import * as qs from 'qs'
import * as dayjs from 'dayjs'
import { Dayjs } from 'dayjs'
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cron, CronExpression } from '@nestjs/schedule'

interface GetHistoryDataRes {
  id: number
  code: number // 2026
  message: string // ""
  body: {
    values: Array<{
      key: string
      vals: Array<{
        time: string // 2024-12-10 22:36:11.331
        value: number
      }>
    }>
  }
}

// 调用 shaoshan 站 API
@Injectable()
export class ShaoshanExternalApiService {
  private readonly logger = new Logger(ShaoshanExternalApiService.name)

  constructor(
    @Inject(shaoshanConfig.KEY)
    private readonly shaoshanConf: ConfigType<typeof shaoshanConfig>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
    console.log(`是否 DEBUG 模式：${this.isDebug}`)
  }

  private readonly isDebug = process.env.DEBUG === 'true'

  // 每两个小时自动刷新一下 token
  @Cron(CronExpression.EVERY_2_HOURS)
  async refreshToken() {
    const token = await this.getToken(false)
    this.logger.log(`刷新 token 成功，token：${token}`)
  }

  // 获取 token
  getToken = async (useCache: boolean = true) => {
    // 如果是本地开发，就随机返回一个
    if (this.isDebug) {
      return 'debugtoken'
    }

    // 判断是否存在缓存，存在就直接返回
    const oldToken = await this.cacheManager.get<string>('shaoshan-token')

    if (useCache && oldToken) {
      return oldToken
    }

    const { clientId, clientSecret, url } = this.shaoshanConf

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const data = qs.stringify({
      grant_type: 'client_credentials',
      scope: 'all',
      client_id: clientId,
      client_secret: clientSecret
    })

    this.logger.log(`调用外部接口获取 token，参数：${JSON.stringify(data)}`)

    const res = await axios.request<{
      access_token: string
      expires_in: number
      token_type: string
    }>({
      url: `${url}/shaoshan/auth-service/oauth/token`,
      method: 'POST',
      headers,
      data
    })

    this.logger.log(`调用外部接口获取 token，返回：${JSON.stringify(res.data)}`)

    const token = res.data.access_token

    await this.cacheManager.set('shaoshan-token', token, 1000 * 60 * 60 * 12)

    return token
  }

  // 批量查询实时数据
  getRealtimeData = async (keys: string[]) => {
    const { url, hwID, hwAppKey, clientId } = this.shaoshanConf

    // 如果 debug，随机返回
    if (this.isDebug) {
      const now = dayjs()
        .subtract(Math.floor(Math.random() * 60), 'minutes')
        .format('YYYY-MM-DD HH:mm:ss.SSS')
      return keys.map((key) => ({
        fresh_time: now,
        key,
        quality: 1,
        time_stamp: now,
        value: Math.random()
      }))
    }

    const token = await this.getToken()

    const headers = {
      'X-HW-ID': hwID,
      'X-HW-APPKEY': hwAppKey,
      Authorization: `Bearer ${token}`
    }

    const data = {
      // 输入多少返回多少，采用 32 位有符号整数，最大可表示的正整数为 2,147,483,647，再大就溢出变为负数了
      // 可以 random 一个随机正整数，然后当做接口标识，方便调试
      id: Math.floor(Math.random() * 2147483647),
      client_id: clientId,
      body: {
        datatype: 'analog',
        keys
      }
    }

    this.logger.log(`调用外部接口获取实时数据，参数：${JSON.stringify(data)}`)

    const res = await axios.request<{
      id: number
      code: number // 2023
      message: string // 获取实时信号值成功
      body: {
        values: Array<{
          fresh_time: string // 2024-12-10 22:36:11.331
          key: number
          quality: number
          time_stamp: string // 2024-12-10 22:36:11.331
          value: number // 0.90999999969999999
        }>
      }
    }>({
      url: `${url}/v1/cs/realdata-service/data/realtime`,
      method: 'POST',
      headers,
      data
    })

    this.logger.log(
      `调用外部接口获取实时数据，返回：${JSON.stringify(res.data)}`
    )

    return res.data.body.values
  }

  // 批量查询历史数据
  // 公共组件支持应用按需查询指定一组遥测信号的历史数据。单次查询数据返回总量不应超过10万条，超过一定量时，返回调用失败，提示采用分批多次取数据方式获取数据，以防网络拥堵。
  getHistoryData = async (options: {
    keys: string[] // 信号索引键，需查询的信号列表
    startTime: Dayjs // 开始时间 yyyy-MM-dd HH:mm:ss.SSS
    endTime: Dayjs // 结束时间 yyyy-MM-dd HH:mm:ss.SSS
    count?: number // 是否查询统计值 0：不查询统计值 1：查询统计值
  }) => {
    const { keys, startTime, endTime, count = 0 } = options
    const { url, hwID, hwAppKey, clientId } = this.shaoshanConf

    const token = await this.getToken()

    const headers = {
      'X-HW-ID': hwID,
      'X-HW-APPKEY': hwAppKey,
      Authorization: `Bearer ${token}`
    }

    // 开始和结束时间之间，最多采样一百个点，需要计算一下间隔设置为多少合适
    const intervalMinute = Math.floor(
      dayjs(endTime).diff(startTime, 'second') / 100 / 60
    )

    const data = {
      // 输入多少返回多少，采用 32 位有符号整数，最大可表示的正整数为 2,147,483,647，再大就溢出变为负数了
      // 可以 random 一个随机正整数，然后当做接口标识，方便调试
      id: Math.floor(Math.random() * 2147483647),
      client_id: clientId,
      body: {
        datatype: 'analog',
        keys,
        startTime: startTime.format('YYYY-MM-DD HH:mm:ss.SSS'),
        endTime: endTime.format('YYYY-MM-DD HH:mm:ss.SSS'),
        interval: intervalMinute, // 取值间隔，如：5，表示五分钟取一个值
        count
      }
    }

    this.logger.log(`调用外部接口获取历史数据，参数：${JSON.stringify(data)}`)

    // 如果是 debug ，造一批数据随机返回
    if (this.isDebug) {
      const now = dayjs()
      const start = now.subtract(6, 'hour')
      const interval = 5

      const values = [
        {
          key: keys[0],
          vals: []
        }
      ]
      for (let i = 0; i < 100; i++) {
        const time = start.add(i * interval, 'minute')
        values[0].vals.push({
          time: time.format('YYYY-MM-DD HH:mm:ss.SSS'),
          value: Math.random()
        })
      }
      return values
    }

    const res = await axios.request<GetHistoryDataRes>({
      url: `${url}/v1/cs/hisdata-service/data/history`,
      method: 'POST',
      headers,
      data
    })

    this.logger.log(
      `调用外部接口获取历史数据，返回：${JSON.stringify(res.data)}`
    )

    return res.data.body.values
  }
}
