import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import img from './unnamed-min.jpg';
import './Wrapper.scss';

import {Game} from '../../types/games';

import Http from '../modulHttp';

import {GamesList} from '../GamesList/GamesList';
import {PlayingField} from '../PlayingField/PlayingField';

export const Wrapper = (): JSX.Element => {
  const [game, setGame] = useState<Game>()


  function _heandlerNewGame(): void {
    Http<Game>('http://localhost:8000/game', 'post').then(resolve => setGame(resolve));
  }

  function _heandlerEnterTheGame(game: Game): void {
    setGame(game)
  }

  console.log('game', game)

  return (
    <div className="wrapper">
      <div className="conteiner">
        <img src={img} alt="Крестики нолики"/>
        <div className="field">
          <Router>
            <>
            <Switch>
              <Route path='/' exact>
                <GamesList heandlerNewGame={_heandlerNewGame} heandlerEnterTheGame={_heandlerEnterTheGame}/>
              </Route>
              <Route path='/game/play'>
                <PlayingField game={game}/>
              </Route>
              <Route path='*'>
                <Redirect to='/'/>
              </Route>
            </Switch>
            </>
          </Router>
        </div>
      </div>
    </div>
  )
}