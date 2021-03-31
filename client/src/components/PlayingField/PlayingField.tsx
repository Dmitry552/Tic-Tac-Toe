import React from 'react';
import {Cross} from '../Cross/Cross';
import {Zero} from '../Zero/Zero';
import './PlayingField.scss';
import {PlayingFieldProps} from './PlayingField.type';


export const PlayingField = (props: PlayingFieldProps): JSX.Element => {
  const {game} = props

  return (
  <div className="playing_field">
    <div className="field">
      <div className="rank rank1">
        <div className="column column1">
          <Cross/>
        </div>
        <div className="column column2"></div>
        <div className="column column3"></div>
      </div>
      <div className="rank rank2">
        <div className="column column1"></div>
        <div className="column column2">
          <Zero/>
        </div>
        <div className="column column3"></div>
      </div>
      <div className="rank rank3">
        <div className="column column1"></div>
        <div className="column column2"></div>
        <div className="column column3">
          <Zero/>
        </div>
      </div>
    </div>
  </div>
  )
}