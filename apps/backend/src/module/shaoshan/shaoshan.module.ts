import { Module } from '@nestjs/common'
import { SharedModule } from '../shared/shared.module'
import { ShaoshanController } from './shaoshan.controller'
import { ShaoshanService } from './shaoshan.service'

@Module({
  imports: [SharedModule],
  controllers: [ShaoshanController],
  providers: [ShaoshanService]
})
export class ShaoshanModule {}
