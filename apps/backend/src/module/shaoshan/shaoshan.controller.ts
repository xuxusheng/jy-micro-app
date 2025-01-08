import { Controller, Get, Query } from '@nestjs/common'
import { ShaoshanService } from './shaoshan.service'
import { ShaoshanExternalApiService } from '../shared/service/shaoshan-external-api.service'

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

  // 测试通过 key 获取 value 的能力
  @Get('test/get-value-by-key')
  testGetValueByKey(@Query('key') key: number) {
    return this.shaoshanExternalApiService.getValuesByKeys([
      key || 4222126589739011
    ])
  }
}
