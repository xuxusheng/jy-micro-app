import { Controller, Get, Query } from '@nestjs/common'
import { ShaoshanService } from './shaoshan.service'
import { ShaoshanExternalApiService } from '../shared/service/shaoshan-external-api.service'
import * as dayjs from 'dayjs'
import { PageMiddleScreenDataDto } from './dto/page-middle-screen-data.dto'
import { GetHistoryDataDto } from './dto/get-history-data.dto'

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
      endTime
    })
  }

  // 查询区域可选项
  @Get('area-options')
  getAreaOptions() {
    return this.shaoshanService.getAreaOptions()
  }

  // 查询设备名可选项
  @Get('device-name-options')
  getDeviceNameOptions() {
    return this.shaoshanService.getDeviceNameOptions()
  }

  // 查询中屏表格数据
  @Get('middle-screen/page')
  getMiddleScreenPageData(@Query() dto: PageMiddleScreenDataDto) {
    return this.shaoshanService.getMiddleScreenPageData(dto)
  }

  // 查询指定测点的历史数据
  @Get('history-data')
  getHistoryData(@Query() dto: GetHistoryDataDto) {
    return this.shaoshanService.getHistoryData(dto)
  }
}
