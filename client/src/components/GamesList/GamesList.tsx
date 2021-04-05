import {useState, useEffect} from 'react';
import Http from '../modulHttp';
import {Card} from '../Card/Card';
import './GamesList.scss';
import {Game} from '../../types/games';
import {Props} from './Props.type';

 
export const GamesList = (props: Props): JSX.Element => {
  const [games, setGames] = useState<Game[]>([]);
  const {heandlerNewGame, heandlerEnterTheGame} = props
  
  useEffect(() => {
    Http<Array<Game>>('http://localhost:8000/games').then(resolve => setGames(resolve));
  }, [])
  
  return (
    <div className="game_list">
      <div className="button_block">
        <button type='button' onClick={()=>heandlerNewGame()}>Создать новую игру</button>
      </div>
      <div className="game-list">
        {games ? games.map(e => {
          return (
            <Card 
              heandlerEnterTheGame = {heandlerEnterTheGame}
              game = {e}
              key = {e.uuid}
            />
          )
        }) : <h1>Извените доступных игр нет</h1>}
      </div>
    </div>
  )
}