
import {Cross} from '../Cross/Cross';
import {Zero} from '../Zero/Zero';
import {Props} from './CellProps.type';
import './Cell.scss';

export const Cell = (props: Props): JSX.Element => {
  const {value, index, handlerClick} = props

  function Icon(): JSX.Element | undefined{
    if(value === 'x') {
      return <Cross/>
    } else if(value === 'o') {
      return <Zero/>
    } else {return undefined}
  }

  return (
    <div className="cell">
      <div className="cell_component" onClick={()=> handlerClick(index)}>
        {Icon()}
      </div>
    </div>
  )
}