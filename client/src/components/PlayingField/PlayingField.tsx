import {useEffect, useState} from 'react';
import { useSocket } from '../useSocket';
import {Player, PlayerType} from '../../types/players';
import {Cell} from '../Cell/Cell';
import './PlayingField.scss';
import {PlayingFieldProps} from './PlayingField.type';
import history from '../history';


export const PlayingField = (props: PlayingFieldProps): JSX.Element => {
  const { game, player } = props
  const [token, setToken] = useState<Player | undefined>(player)
  const { socket } = useSocket();
  !game && history.push('/');

  useEffect(()=> {
    if(!token) {
      game?.players.o ? setToken({symbol: PlayerType.X}) : setToken({symbol: PlayerType.O});
    } else localStorage.setItem('player', game?.uuid + '_' + token.symbol);
  }, [token])

  return (
  <div className="playing_field">
    <div className="field">
      {game?.map.map((e, key)=>{
        return <Cell key={key} index={e}/>
      })}
    </div>
  </div>
  )
}
