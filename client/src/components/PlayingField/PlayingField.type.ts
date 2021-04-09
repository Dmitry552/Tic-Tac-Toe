import { Player, PlayerType } from '../../types/players';
import {Game, GameStatus} from '../../types/games';

export type PlayingFieldProps = {
  game?: Game
  player?: Player
}

export type MoveRequest = {
  index: number,
  token: string,
}

export enum Color {
  red = 'red',
  green = 'green',
  yellow = 'yellow'

}