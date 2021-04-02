import React, {useState, useEffect, useRef, LegacyRef} from 'react';
//import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
//import {createBrowserHistory} from 'history';

import img from './unnamed-min.jpg';
import './Wrapper.scss';

import {Game} from '../../types/games';
import {Player} from '../../types/players';
import {GameResonse} from '../../types/new-game-resp';

import Http from '../modulHttp';

import {GamesList} from '../GamesList/GamesList';
import {PlayingField} from '../PlayingField/PlayingField';

//const history = createBrowserHistory();

export const Wrapper = (): JSX.Element => {
  const [game, setGame] = useState<Game>()
  const [player, setPlayer] = useState<Player>()
  const routerRef = useRef() as LegacyRef<Router>;

  function _heandlerEnterTheGame(game: Game): void {
    setGame(game)
  } 

  //const history = ():History  => (routerRef as any)['current']['history'];

  function _heandlerNewGame(): void {
    //debugger
    Http<GameResonse>('http://localhost:8000/game', 'post').then(resolve => {
      setGame(resolve.game); 
      setPlayer(resolve.player);
      localStorage.setItem('player', resolve.game.uuid + '_' + resolve.player.symbol)
    });
  }

  useEffect(() => {
    let player_ = localStorage.getItem('player')
    if(player_) {
      Http<Game>(`http://localhost:8000/games/${player_.split('_')[0]}`).then(resolve => {
        setGame(resolve);
        //history.
        //history().push('/game/play')
      }).catch(err => {
        localStorage.removeItem('player')
      });
    }
  }, [])


    
  return (
    <div className="wrapper">
      <div className="conteiner">
        <img src={img} alt="Крестики нолики"/>
        <div className="field">

          {/* <Router ref={routerRef} > */}
          <Router>
            <>
              <Switch>
                <Route path='/' exact>
                  <GamesList heandlerNewGame={_heandlerNewGame} heandlerEnterTheGame={_heandlerEnterTheGame}/>
                </Route>
                <Route path='/game/play'>
                  <PlayingField game={game} player={player}/>
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