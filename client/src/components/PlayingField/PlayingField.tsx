
import { useSocket } from '../useSocket';
import {Allert} from '../Allert/Allert';
import {Cell} from '../Cell/Cell';
import './PlayingField.scss';
import {PlayingFieldProps, MoveRequest, MoveResponse} from './PlayingField.type';
import history from '../history';
import { useState } from 'react';


export const PlayingField = (props: PlayingFieldProps): JSX.Element => {
  const { game, player } = props
  const [currentGame, setcurrentGame] = useState(game) // <--- Выведенно в отдельное состояние так как в ответе websocket обновляю game для перерисовки map, а game из props это константа
  const [message, setMessage] = useState<string>('')
  const { socket } = useSocket();

  !game && history.push('/') // <-- Защита. Если в ручную вбить адрес /game/play вернет на главную страницу.
  
  function _handlerClick(event: number) {
    setMessage('');
    let data: MoveRequest;
    data = {
      index: event,
      token: game?.uuid + '_' + player?.symbol
    }  
    socket.emit("my-ping", data);
    socket.on('my-pong', (data: MoveResponse) => {
      setcurrentGame(data.game)
      setMessage(data.massage)
    })
  }

  

  return (
  <div className="playing_field">
    <div className="field" >
      {currentGame?.map.map((e, index)=>{
        return <Cell key={String(index)} value={e} index={index} handlerClick={_handlerClick}/>
      })}
    </div>
      {message && <Allert message={message} colorChange={"green"}/>}
  </div>
  )
}
