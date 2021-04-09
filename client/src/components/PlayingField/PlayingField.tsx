
import { useSocket } from '../useSocket';
import {Allert} from '../Allert/Allert';
import {Cell} from '../Cell/Cell';
import './PlayingField.scss';
import {PlayingFieldProps, MoveRequest, MoveResponse, Color} from './PlayingField.type';
import history from '../history';
import { useEffect, useState } from 'react';
import {Game, GameStatus} from '../../types/games';
import {PlayerType, Player} from '../../types/players';
import {Cross} from '../Cross/Cross';
import {Zero} from '../Zero/Zero';



export const PlayingField = (props: PlayingFieldProps): JSX.Element => {
  const { game, player } = props

  const [currentGame, setcurrentGame] = useState<Game | undefined>(game)
  const [message, setMessage] = useState<string>('')
  const [colorAllert, setColorAllert] = useState<Color>(Color.red);
  const [runningState, setRunningState] = useState<GameStatus | undefined>();
  const [playerGame, setPlayerGame] = useState<Player | undefined>(player);

  const { socket } = useSocket();

  !game && history.push('/') 

  
  function handleGameUpdate(data: MoveResponse) {
    if (game?.uuid === data.game.uuid) {
      setcurrentGame(data.game)
      setMessage(data.massage)
      setColorAllert(data.color)
      setPlayerGame(data.player) 
      setRunningState(data.statusPlayer)
    }
  }

  useEffect(()=>{
    socket.on('game_move', handleGameUpdate)
    
    return () => {
      socket.off('game_move', handleGameUpdate)
    }
  }, [])
  
  function _handlerClick(event: number) {
    setMessage('');
    let data: MoveRequest;
    data = {
      index: event,
      token: game?.uuid + '_' + player?.symbol
    }  
    socket.emit("player_turn", data);
  }
  
  return (
  <div className="playing_field">
    <div className="player">
      <p>Вы играете за</p>
      <div className="player_icon">
        {player?.symbol === PlayerType.O ? <Zero/> : <Cross/>}
      </div>
    </div>
    <div className="move">
      <p>Ходит: {runningState?.split('_')[1].toUpperCase()}</p>
    </div>
    <div className="field" >
      {currentGame?.map.map((e, index)=>{
        return <Cell key={String(index)} value={e} index={index} handlerClick={_handlerClick}/>
      })}
    </div>
      {(currentGame?.state === 'win' || (message && playerGame?.symbol === player?.symbol)) && <Allert message={message} colorChange={colorAllert}/>}
      
  </div>
  )
}
