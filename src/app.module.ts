import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiverController } from './mqtt/mqtt.controller';

@Module({
  imports: [],
  controllers: [AppController,ReceiverController],
  providers: [AppService],
})
export class AppModule {}
