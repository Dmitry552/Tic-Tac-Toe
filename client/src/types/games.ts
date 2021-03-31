import { PlayerType, Players } from './players';

export interface Games {
  [uuid: string]: Game;
}

export interface Game {
  uuid: string;
  players: Players;
  map: Array<string>;
  state: GameStatus;
  winer?: PlayerType;
}

export enum GameStatus {
  new_game = 'new_game',
  playerX = 'player_X',
  playerY = 'playqr_y',
  draw = 'draw',
  win = "win"
}