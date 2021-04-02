import React from 'react';
import {Cross} from '../Cross/Cross';
import {Zero} from '../Zero/Zero';
import {Props} from './CellProps.type';
import './Cell.scss';

export const Cell = (props: Props): JSX.Element => {
  const {index} = props

  function Icon(index: string): JSX.Element | undefined{
    if(index === 'x') {
      return <Cross/>
    } else if(index === 'o') {
      return <Zero/>
    } else {return undefined}
  }

  return (
    <div className="cell">
      <div className="cell_component">
        {Icon(index)}
      </div>
    </div>
  )
}