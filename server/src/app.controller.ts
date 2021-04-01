
import { NewGameResonse } from './types/new-game-resp';
import { Game } from './types/games';
import { Controller, Get, Post, Param, Query} from '@nestjs/common';
import { GameService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly gameService: GameService) {}

  @Get('/games')
  gamesList(@Query() {all}: {all: boolean}): Game[] {
    return this.gameService.gamesList(all);
  }


  @Get('/games/:id')
  getGame(@Param('id') id: string): Game {

    return this.gameService.getGame(id);
  }

  @Post('/game')
  createGames(): NewGameResonse {
    return this.gameService.createGame();
  }
}
