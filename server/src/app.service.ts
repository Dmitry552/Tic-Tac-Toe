import { NewGameResonse } from './types/new-game-resp';
import { PlayerType } from './types/players';
import { Game, Games, GameStatus } from './types/games';
import { Injectable } from '@nestjs/common';
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

  gamesList(body): Array<object> | object {
    if(body.id) {
      for(let key in this.games) {
        if(key === body.id) return this.games[key];
      }
      return this.games;
    } else if(body.all) {
        return this.games
    } else {
      let rezult: Array<object> = [];
      for(let key in this.games) {
        let count:number = 0
        const playar = this.games[key]
        for(let a in playar.players) {
          count++ 
        }
        if(count < 2) {
          rezult.push(playar);
        }
      }
      return rezult
    }
  }

  getHello(): string {
    return `Hello World`;
  }
}




// структура игры
// {
//   "uuid": {
//     uuid: ...
//     map: ['x', 'o'],
//     players: {
//       x: {
//         simbol: 'x'
//       }
//       o:
//     },
//     state: '',
//     winer: null
//   }
// }
