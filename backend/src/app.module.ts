import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './utils/helpers';

dotenv.config({ path: path.join(__dirname, 'config', 'envs', `.env.${process.env.NODE_ENV}`) });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // expandVariables: true,
      envFilePath: getEnvPath(path.join(__dirname, 'config', 'envs ')),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
//
export class AppModule {}
