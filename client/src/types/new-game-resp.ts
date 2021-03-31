import { Game } from './games';
import { Player } from './players';

export interface GameResonse {
  player: Player
  game: Game
}