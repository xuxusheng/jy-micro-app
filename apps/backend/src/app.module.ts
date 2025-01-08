import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'node:path'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoreModule } from './module/core/core.module'
import { HealthModule } from './module/health/health.module'
import { ShaoshanModule } from './module/shaoshan/shaoshan.module'

@Module({
  controllers: [AppController],
  imports: [
    ServeStaticModule.forRoot({
      exclude: ['/api/(.*)'],
      rootPath: path.join(__dirname, '..', 'frontend')
    }),
    CoreModule,
    HealthModule,
    ShaoshanModule
  ],
  providers: [AppService]
})
export class AppModule {}
