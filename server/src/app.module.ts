import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GameService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [GameService],
})
export class AppModule {}
