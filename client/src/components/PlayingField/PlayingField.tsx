
import { useSocket } from '../useSocket';
import {Allert} from '../Allert/Allert';
import {Cell} from '../Cell/Cell';
import './PlayingField.scss';
import {PlayingFieldProps, MoveRequest, Color} from './PlayingField.type';
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
  const [runningState, setRunningState] = useState<PlayerType | undefined>();

  const { socket } = useSocket();

  !game && history.push('/') 

  
  function handleGameUpdate(data: Game) {
    if (game?.uuid === data.uuid) {
      setcurrentGame(data)
    }
  }

  useEffect(()=>{
    socket.on('game_move', handleGameUpdate)
    return () => {
      socket.off('game_move', handleGameUpdate)
    }
  }, [])
  
  useEffect(() => {
    if(currentGame?.state === GameStatus.playerX) {
        setRunningState(PlayerType.X)
      } else if(currentGame?.state === GameStatus.playerO) {
        setRunningState(PlayerType.O)
      }
      Message()
  }, [currentGame])

  function Message(): void {
    if(runningState && player?.symbol !== runningState){
      setMessage('Сейчас не ваш ход!')
    }
    if(currentGame?.state === GameStatus.win) {
      setMessage(`Победа игрока ${runningState?.toUpperCase()}`);
      setColorAllert(Color.green);
    }
    if(currentGame?.state === GameStatus.draw) {
      setMessage('Ничья');
      setColorAllert(Color.yellow);
    }
  }

  
  function _handlerClick(event: number) {
    setMessage('');
    if(currentGame?.map[event]) {
      setMessage('Ячейка занята!');
      return
    }
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
      <p>Ходит: {runningState?.toUpperCase()}</p>
    </div>
    <div className="field" >
      {currentGame?.map.map((e, index)=>{
        return <Cell key={String(index)} value={e} index={index} handlerClick={_handlerClick}/>
      })}
    </div>
      {(currentGame?.state === 'win' || 
      currentGame?.state === 'draw' || 
      (message && (runningState && player?.symbol !== runningState))) && <Allert message={message} colorChange={colorAllert}/>}
      
  </div>
  )
}
