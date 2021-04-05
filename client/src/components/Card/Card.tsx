
import {CardPropsType, StatusText} from './CardProps.type';
import './Card.scss';


const STATUSES: StatusText = {
  new_game: 'Новая игра',
  player_x: 'Ходит Х',
  player_o: 'Ходит O',
  draw: 'Что-то',
  win: 'Победа'
}

export const Card = (props: CardPropsType): JSX.Element => {

  const {heandlerEnterTheGame, game} = props
  console.log('_game', game)

  return (
    <div className="card">
      <div className="card_conteiner">
        <div className="state_game">
          <p>Статус игры: {STATUSES[game.state]}</p>
        </div>
        <div className="button">
          <button type="button" onClick={() => heandlerEnterTheGame(game)}>Добавится к игре</button>
        </div>
      </div>
    </div>
  )
}