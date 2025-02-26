import { Injectable } from '@nestjs/common'
import { PageMiddleScreenDataDto } from './dto/page-middle-screen-data.dto'
import { middleScreenData } from './data'
import { ShaoshanExternalApiService } from '../shared/service/shaoshan-external-api.service'
import { GetHistoryDataDto } from './dto/get-history-data.dto'
import * as dayjs from 'dayjs'
import { BadRequestException } from '../core/exception/custom-exception'
import { ListMiddleScreenStatusDto } from './dto/list-middle-screen-status.dto'

type PageMiddleScreenData = (typeof middleScreenData)[0] & {
  value?: number
  timestamp?: string
}

@Injectable()
export class ShaoshanService {
  constructor(
    private readonly shaoShanExternalService: ShaoshanExternalApiService
  ) {}

  // 查询关键数据监测列表
  async pageMiddleScreenData(dto: PageMiddleScreenDataDto) {
    const { pn, ps, area, dataName, isTop, deviceName } = dto

    let data = middleScreenData

    if (area) {
      data = data.filter((item) => item.area === area)
    }

    if (deviceName) {
      data = data.filter((item) => item.deviceName.includes(deviceName))
    }

    if (dataName) {
      data = data.filter((item) => item.dataName.includes(dataName))
    }

    if (isTop) {
      data = data.filter((item) => item.isTop === (isTop === 'true'))
    }

    const total = data.length
    const items: PageMiddleScreenData[] = data.slice((pn - 1) * ps, pn * ps)

    if (items.length) {
      // 如果存在数据，就查询实时值
      const res = await this.shaoShanExternalService.getRealtimeData(
        items.map((item) => item.key)
      )

      items.forEach((item) => {
        const realtimeData = res.find(
          (resItem) => String(resItem.key) === String(item.key)
        )

        if (!realtimeData) {
          return
        }

        item.value = realtimeData.value
        item.timestamp = realtimeData.time_stamp
      })
    }

    return {
      total,
      items
    }
  }

  getAreaOptions() {
    return Array.from(new Set(middleScreenData.map((item) => item.area)))
  }

  getDeviceNameOptions() {
    return Array.from(new Set(middleScreenData.map((item) => item.deviceName)))
  }

  // 查询历史数据
  async getHistoryData(dto: GetHistoryDataDto) {
    const { key } = dto

    const startTime = dayjs(dto.startTime)
    const endTime = dayjs(dto.endTime)

    // 开始时间必须早于结束时间
    if (!startTime.isBefore(endTime)) {
      throw new BadRequestException('开始时间必须早于结束时间')
    }

    const res = await this.shaoShanExternalService.getHistoryData({
      keys: [key],
      startTime,
      endTime
    })

    return res[0]
  }

  async listMiddleScreenStatus(dto: ListMiddleScreenStatusDto) {
    const measurementPoints = [
      {
        key: '3940650449895437',
        area: '极Ⅰ低端',
        deviceName: '阀内冷水系统'
      },
      {
        key: '3940650441834509',
        area: '极Ⅰ高端',
        deviceName: '阀内冷水系统'
      },
      {
        key: '3940650457956365',
        area: '极Ⅱ高端',
        deviceName: '阀内冷水系统'
      },
      {
        key: '3940650466017293',
        area: '极Ⅱ低端',
        deviceName: '阀内冷水系统'
      }
    ].filter(({ area }) => dto.area === area)

    const res = await this.shaoShanExternalService.getRealtimeData(
      measurementPoints.map((item) => item.key)
    )

    return measurementPoints.map(({ key, area, deviceName }) => {
      const data = res.find((item) => item.key === key)
      return {
        key,
        area,
        deviceName,
        value: data?.value,
        timestamp: data?.time_stamp
      }
    })
  }
}
