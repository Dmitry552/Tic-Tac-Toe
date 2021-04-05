import { NewGameResonse } from './types/new-game-resp';
import { PlayerType } from './types/players';
import { Game, Games, GameStatus } from './types/games';
import { Injectable, NotFoundException} from '@nestjs/common';
import {v4 as uuid} from 'uuid';


@Injectable()
export class GameService {
  games: Games = {};

  createGame() :NewGameResonse {
    let game: Game = {
      uuid: uuid(),
      map: Array(9).fill(''),
      players: {
      },
      state: GameStatus.new_game,
    };

    let playerType = Math.random() > 0.5 ? PlayerType.X : PlayerType.O;

    game.players = {
      [playerType]: {
        symbol: playerType
      }
    }
    
    this.games[game.uuid] = game;

    return {
      player: {
        symbol: playerType
      },
      game
    };

  }

  gamesList(all: boolean): Game[] {
    let result: Game[] = [];

    for(let key in this.games) {
      const playar = this.games[key]
      if(all || (!playar.players.x || !playar.players.o)) result.push(this.games[key])

    }
    return result
  }

  getGame(id: string, side: string): NewGameResonse {
    let game: Game;
      if(this.games[id]) {
        game = this.games[id]
      } else {
      throw new NotFoundException('Not Found', 'There is no such game')
    }
    if(!side) {
      let playerType = game.players.o ? PlayerType.X : PlayerType.O;
      if(game.players.o) {
        game.players.x = {
          symbol: playerType
        }
      } else {
        game.players.o = {
          symbol: playerType
        }
      }
      return {
        player: {
          symbol: playerType
        },
        game
      }
    } else {
      return {
        player: {
          symbol: side === 'x' ? PlayerType.X : PlayerType.O
        },
        game
      }
    }
    
    
  }
}
