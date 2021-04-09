import { PlayerType, Players, Player } from './players';

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
  playerX = 'player_x',
  playerO = 'player_o',
  draw = 'draw',
  win = "win"
}

export interface MoveRequest {
  index: number;
  token: string;
}

export interface MoveResponse {
  game: Game
}

export enum Color {
  red = 'red',
  green = 'green',
  yellow = 'yellow'

}