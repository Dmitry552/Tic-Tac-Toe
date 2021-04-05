
import { useSocket } from '../useSocket';
import {Cell} from '../Cell/Cell';
import './PlayingField.scss';
import {PlayingFieldProps} from './PlayingField.type';
import history from '../history';
import React from 'react';


export const PlayingField = (props: PlayingFieldProps): JSX.Element => {
  const { game, player } = props
  const { socket } = useSocket();
  console.log('game', game)
  console.log('player', player)
  !game && history.push('/');

  player && localStorage.setItem('player', game?.uuid + '_' + player.symbol)

  function _handlerClick(event: any): void {
    //let a = +e.getAttribute('data-index')
    console.log(+event.getAttribute('data-index'))
  }
 
  return (
  <div className="playing_field">
    <div className="field" onClick={(e) => _handlerClick(e.target)}>
      {game?.map.map((e, index)=>{
        return <Cell key={index} value={e} index={index}/>
      })}
    </div>
  </div>
  )
}
