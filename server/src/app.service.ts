import { NewGameResonse } from './types/new-game-resp';
import { PlayerType } from './types/players';
import { Game, Games, GameStatus, MoveResponse, Color } from './types/games';
import { Injectable, NotFoundException} from '@nestjs/common';
import {v4 as uuid} from 'uuid';
import { GatewayMetadataExplorer } from '@nestjs/websockets/gateway-metadata-explorer';


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

  getGame(id: string): Game {

    if(this.games[id]) {
      return this.games[id];
    } else {
      throw new NotFoundException('Not Found', 'There is no such game')
    }
  }

  
  enterTheGame(id: string): NewGameResonse {
    let game: Game = this.games[id];

    if(!game) {
      throw new NotFoundException('Not Found', 'There is no such game')
    }
    
    if(!game.players.o || !game.players.x) {
      let playerType = game.players.o ? PlayerType.X : PlayerType.O;
      
      game.players = {
        ...game.players,
        [playerType]: {
          symbol: playerType
        }
      }
      return {
        player: {
          symbol: playerType
        },
        game
      }
    }  else {
      throw new Error('The game is not available')
    }
  }

  playingGame(index: number, token: string): MoveResponse {
    let data: Array<string> = token.split('_');
    let Game: Game = this.games[data[0]];
    let Status: GameStatus = (data[1] === 'x') ? GameStatus.playerO : GameStatus.playerX;
    let message: string = '';
    let color: Color = Color.red;

    if(!Game) {
      throw new NotFoundException('Not Found', 'There is no such game')
    }
    
    if(Game.state !== GameStatus.win){
      if (Game.state === GameStatus.new_game || Game.state !== Status) {
        if(!Game.map[index] && !(Game.map[index] === data[1])) {
          Game.map[index] = data[1];
          Game.state = Status
        } else {
          message = 'Ячейка занята!';
          Status = Game.state
        }
      } else {
        message = 'Сейчас не ваш ход!';
      }
    } else {
      message = 'Игра окончена!';
      color = Color.yellow;
      Game.state = GameStatus.win;
    }

    const win = [
      [0,3,6],
      [1,4,7],
      [2,5,8]
    ]

    // let winer;
    // win.find(w => {
    //   if(Game.map[w[0]] == Game.map[w[1]] && Game.map[w[1]] == Game.map[w[2]]) {
    //     winer = Game.map[w[0]];
    //     return true;
    //   }
    // })

    Game.map.filter(v => !v).length == 0


    if(Game.state !== GameStatus.win) {
      if(Game.map.slice(0, 4).filter((e) => e === data[1]).length === 3 || 
        Game.map.slice(4, 7).filter((e) => e === data[1]).length === 3 || 
        Game.map.slice(7).filter((e) => e === data[1]).length === 3 ||
        [Game.map[0], Game.map[4], Game.map[8]].filter((e) => e === data[1]).length === 3 ||
        [Game.map[2], Game.map[4], Game.map[6]].filter((e) => e === data[1]).length === 3) {
          Game.state = GameStatus.win;
          message = `Победа. Выграл ${data[1].toUpperCase()}`;
          color = Color.green;
      }
      win.find(w => {
        if(Game.map[w[0]] === Game.map[w[1]] && Game.map[w[1]] === Game.map[w[2]]) {
          Game.state = GameStatus.win;
          message = `Победа. Выграл ${data[1].toUpperCase()}`;
          color = Color.green;
        }
      });
      if(Game.map.filter(v => !v).length === 0) {
        Game.state = GameStatus.win;
        message = `Победа. Выграл ${data[1].toUpperCase()}`;
        color = Color.green;
      }

    }

    return {
      game: {
        map: Game.map,
        state: Game.state,
        uuid: Game.uuid,
        players: Game.players
      },
      massage: message,
      color: color,
      statusPlayer: Status,
      player: { 
        symbol: data[1]
      }
    }
  }
}
