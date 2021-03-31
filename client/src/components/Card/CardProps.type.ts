
import {Game} from '../../types/games';
export type CardPropsType = {
  heandlerEnterTheGame: (game: Game) => void
  game: Game
}

export interface StatusText {
  [key: string]: string; 
}