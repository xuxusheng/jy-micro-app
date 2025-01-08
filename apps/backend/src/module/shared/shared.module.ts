import { Module } from '@nestjs/common'
import { ShaoshanExternalApiService } from './service/shaoshan-external-api.service'
// import { PrismaService } from './service/prisma.service'
// import { RunnerService } from './service/runner.service'

@Module({
  imports: [],
  providers: [ShaoshanExternalApiService],
  exports: [ShaoshanExternalApiService]
  // providers: [RunnerService, PrismaService],
  // exports: [RunnerService, PrismaService]
})
export class SharedModule {}
