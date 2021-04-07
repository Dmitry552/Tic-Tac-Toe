
import { useSocket } from '../useSocket';
import {Player, PlayerType} from '../../types/players';
import {Cell} from '../Cell/Cell';
import './PlayingField.scss';
import {PlayingFieldProps} from './PlayingField.type';
import history from '../history';


export const PlayingField = (props: PlayingFieldProps): JSX.Element => {
  const { game, player } = props
  const { socket } = useSocket();
  !game && history.push('/');

  return (
  <div className="playing_field">
    <div className="field">
      {game?.map.map((e, index)=>{
        return <Cell key={index} value={e}/>
      })}
    </div>
  </div>
  )
}
