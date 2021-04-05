import {useState, useEffect} from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from '../history';

import img from './unnamed-min.jpg';
import './Wrapper.scss';

import {Game} from '../../types/games';
import {Player} from '../../types/players';
import {GameResonse} from '../../types/new-game-resp';

import Http from '../modulHttp';

import {GamesList} from '../GamesList/GamesList';
import {PlayingField} from '../PlayingField/PlayingField';

let firstVisit: boolean = true;

export const Wrapper = (): JSX.Element => {
  const [game, setGame] = useState<Game>()
  const [player, setPlayer] = useState<Player>()
  
  function _heandlerEnterTheGame(game: Game): void {
    Http<GameResonse>(`http://localhost:8000/games/${game.uuid}`, 'post').then(resolve => {
        setGame(resolve.game);
        setPlayer(resolve.player);
        localStorage.setItem('player', resolve.game.uuid + '_' + resolve.player.symbol);
        history.push('/game/play');
      }).catch(err => {
        localStorage.removeItem('player')
      });
  } 

  function _heandlerNewGame(): void {
    Http<GameResonse>('http://localhost:8000/game', 'post').then(resolve => {
      setGame(resolve.game); 
      setPlayer(resolve.player);
      localStorage.setItem('player', resolve.game.uuid + '_' + resolve.player.symbol);
      history.push('/game/play');
    });
  }
  
  useEffect(() => {
    let token = localStorage.getItem('player')
    if(token) {
      Http<GameResonse>(`http://localhost:8000/games/${token.split('_')[0]}?side=${token.split('_')[1]}`, 'post').then(resolve => {
        setGame(resolve.game); 
        setPlayer(resolve.player);
        if(firstVisit) history.push('/game/play');
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
          <Router history={history}>
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
};