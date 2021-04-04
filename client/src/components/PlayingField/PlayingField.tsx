
import { useSocket } from '../useSocket';
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
      {game?.map.map((e, key)=>{
        return <Cell key={key} index={e}/>
      })}
    </div>
  </div>
  )
}
