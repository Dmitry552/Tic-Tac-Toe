import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GameService } from './app.service';
import { AppGateway } from './app.geteway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [GameService, AppGateway],
})
export class AppModule {}
