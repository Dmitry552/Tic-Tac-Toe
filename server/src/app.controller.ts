
import { NewGameResonse } from './types/new-game-resp';
import { Games, Game } from './types/games';
import { Controller, Get, Post, Param, GatewayTimeoutException, Query} from '@nestjs/common';
import { GameService } from './app.service';

type GameDTO = {
  id?: string,
}

@Controller()
export class AppController {
  constructor(private readonly gameService: GameService) {}

  @Get('/games')
  gamesList(@Query() {all}: {all: boolean}): Game[] {
    return this.gameService.gamesList(all);
  }


  @Get('/games/:id')
  game(@Param('id') id: GameDTO): Game {
    return this.gameService.game(id);
  }

  @Post('/game')
  createGames(): NewGameResonse {

    return this.gameService.createGame();
  }
}
