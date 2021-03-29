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

  gamesList(all: boolean): Game[] {
    let result: Game[] = [];
    if(all) {
      for(let key in this.games) { 
        result.push(this.games[key])
      }
      return result
    }
    for(let key in this.games) {
      const playar = this.games[key]
      if(!playar.players.x || !playar.players.o) {
        result.push(this.games[key])
      }
    }
    return result
  }

  game(id): Game {
    for(let key in this.games) {
      if(key === id) return this.games[key];
    }
  }
}
