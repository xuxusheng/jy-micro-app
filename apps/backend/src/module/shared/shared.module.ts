import { Module } from '@nestjs/common'
import { ShaoshanService } from './service/shaoshan.service'
// import { PrismaService } from './service/prisma.service'
// import { RunnerService } from './service/runner.service'

@Module({
  imports: [],
  providers: [ShaoshanService]
  // providers: [RunnerService, PrismaService],
  // exports: [RunnerService, PrismaService]
})
export class SharedModule {}
