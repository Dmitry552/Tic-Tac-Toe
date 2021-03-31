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
  new_game = 'Игра начата',
  playerX = 'Ходит Х',
  playerO = 'Ходит О',
  draw = 'Отрисовка',
  win = "Победа"
}