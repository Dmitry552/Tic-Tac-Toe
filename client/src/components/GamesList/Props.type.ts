import {Game} from '../../types/games';
export type Props = {
  heandlerNewGame: () => void
  heandlerEnterTheGame: (game: Game) => void
  message: string
}