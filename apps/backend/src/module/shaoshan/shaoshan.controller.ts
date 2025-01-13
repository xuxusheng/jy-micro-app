import { Controller, Get, Query } from '@nestjs/common'
import { ShaoshanService } from './shaoshan.service'
import { ShaoshanExternalApiService } from '../shared/service/shaoshan-external-api.service'
import dayjs from 'dayjs'

@Controller('api/shaoshan')
export class ShaoshanController {
  constructor(
    private shaoshanService: ShaoshanService,
    private shaoshanExternalApiService: ShaoshanExternalApiService
  ) {}

  // 测试获取 token 功能
  @Get('test/get-token')
  testGetToken() {
    return this.shaoshanExternalApiService.getToken()
  }

  // 测试获取实时数据功能
  @Get('test/get-realtime-data')
  testGetValueByKey(@Query('key') key: string) {
    return this.shaoshanExternalApiService.getRealtimeData([
      key || '4222126589739011'
    ])
  }

  // 测试获取历史数据的功能
  @Get('test/get-history-data')
  testGetHistoryData(@Query('key') key: string) {
    const startTime = dayjs().subtract(1, 'hour')
    const endTime = dayjs()

    return this.shaoshanExternalApiService.getHistoryData({
      keys: [key || '4222126589739011'],
      startTime,
      endTime,
      interval: 5
    })
  }
}
