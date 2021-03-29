//import { Games } from './types/games';
import { NewGameResonse } from './types/new-game-resp';
import { Controller, Get, Post, Body} from '@nestjs/common';
import { GameService } from './app.service';

type GamesDTO = {
    id?: string,
    all?: string
  }

@Controller()
export class AppController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  getHello(): string {
    return this.gameService.getHello();
  }

  

  @Post('/games')
  gamesList(@Body() body?: GamesDTO ): Array<object> | object {
    return this.gameService.gamesList(body);
  }

  @Post('/game')
  createGames(): NewGameResonse {

    return this.gameService.createGame();
  }

  


}
