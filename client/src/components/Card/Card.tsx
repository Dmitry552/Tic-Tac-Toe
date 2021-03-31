
import {Link} from 'react-router-dom'
import {CardPropsType} from './CardProps.type';
import './Card.scss';

export const Card = (props: CardPropsType): JSX.Element => {

  const {heandlerEnterTheGame, game} = props

    function heandlerStatus(value: string): any {
      switch (value) {
        case 'new_game': return 'Новая игра'
          break;
          case 'player_x': return 'Ходит Х'
          break;
          case 'player_o': return 'Ходит O'
          break;
          case 'draw': return 'Что-то'
          break;
          case 'win': return 'Победа'
          break;
        default: return 'Новая игра'
          break;
      }
    }

  return (
    <div className="card">
      <div className="card_conteiner">
        <div className="state_game">
          <p>Статус игры: {heandlerStatus(game.state)}</p>
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