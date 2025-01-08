import { Inject, Injectable } from '@nestjs/common'
import axios from 'axios'
import { shaoshanConfig } from '../../core/config/shaoshan.config'
import { ConfigType } from '@nestjs/config'
import * as qs from 'qs'

// 调用 shaoshan 站 API
@Injectable()
export class ShaoshanExternalApiService {
  constructor(
    @Inject(shaoshanConfig.KEY)
    private shaoshanConf: ConfigType<typeof shaoshanConfig>
  ) {}

  // 获取 token
  getToken = async () => {
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
    return res.data.access_token
  }

  // 批量通过 key 值获取 value
  getValuesByKeys = async (keys: number[]) => {
    const { url, hwID, hwAppKey, clientId } = this.shaoshanConf

    const token = await this.getToken()

    const headers = {
      'X-HW-ID': hwID,
      'X-HW-APPKEY': hwAppKey,
      Authorization: `Bearer ${token}`
    }

    const res = await axios.request<{
      id: number
      code: number
      message: string
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
      data: {
        id: 1,
        client_id: clientId,
        body: {
          datatype: 'analog',
          keys
        }
      }
    })

    return res.data.body.values
  }
}
