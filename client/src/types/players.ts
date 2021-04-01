export interface Players {
  x?: Player,
  o?: Player 
}

export interface Player {
  symbol: PlayerType;
}

export enum PlayerType {
  X = 'x',
  O = 'o',
}