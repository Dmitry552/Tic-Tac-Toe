
import {Link} from 'react-router-dom'
import {CardPropsType} from './CardProps.type';
import './Card.scss';

export const Card = (props: CardPropsType): JSX.Element => {

  const {heandlerEnterTheGame, game} = props

  return (
    <div className="card">
      <div className="card_conteiner">
        <div className="state_game">
          <p>Статус игры: {game.state}</p>
        </div>
        <div className="button">
          <Link to='/game/play'>
            <button type="button" onClick={() => heandlerEnterTheGame(game)}>Добавится к игре</button>
          </Link>
        </div>
      </div>
    </div>
  )
}