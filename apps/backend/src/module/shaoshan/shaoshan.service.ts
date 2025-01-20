import { Injectable } from '@nestjs/common'
import { PageMiddleScreenDataDto } from './dto/page-middle-screen-data.dto'
import { middleScreenData } from './data'
import { ShaoshanExternalApiService } from '../shared/service/shaoshan-external-api.service'

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
  async getMiddleScreenPageData(dto: PageMiddleScreenDataDto) {
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
        const realtimeData = res.find((resItem) => resItem.key === item.key)

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
}
