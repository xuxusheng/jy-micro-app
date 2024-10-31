import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  imports: [
    ServeStaticModule.forRoot({
      exclude: ['/api/(.*)'],
      rootPath: path.join(__dirname, '..', 'frontend'),
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
