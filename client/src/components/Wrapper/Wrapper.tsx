import {useState, useEffect} from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from '../history';

import img from './unnamed-min.jpg';
import './Wrapper.scss';

import {Game} from '../../types/games';
import {Player, PlayerType} from '../../types/players';
import {GameResonse} from '../../types/new-game-resp';

import Http from '../modulHttp';

import {GamesList} from '../GamesList/GamesList';
import {PlayingField} from '../PlayingField/PlayingField';

let firstVisit: boolean = true;

export const Wrapper = (): JSX.Element => {
  const [game, setGame] = useState<Game>()
  const [player, setPlayer] = useState<Player>()
  const [token, setToken] = useState(localStorage.getItem('player')?.split('_'));
  const [message, setMessage] = useState<string>('');

  function prepareToGame(resolve: GameResonse) {
    setGame(resolve.game);
    setPlayer(resolve.player);
    localStorage.setItem('player', resolve.game.uuid + '_' + resolve.player.symbol);
    history.push('/game/play');
  }
 
  function _heandlerEnterTheGame(game: Game): void {
    setMessage('');  
    Http<GameResonse>(`http://localhost:8000/games/${game.uuid}`, 'post').then(resolve => {
        prepareToGame(resolve)
      }).catch(err =>{
        console.log(err)
        setMessage('Что-то пошло не так! Попробуйте позже')
      });
  } 

  function _heandlerNewGame(): void {
    setMessage(''); 
    Http<GameResonse>('http://localhost:8000/game', 'post').then(resolve => {
      prepareToGame(resolve);
    }).catch(err => {
      console.log(err)
      setMessage('Что-то пошло не так! Попробуйте позже')
    });
  }
  
  useEffect(() => {
    
    if(token) {
      Http<Game>(`http://localhost:8000/games/${token[0]}`).then(resolve => {
        setGame(resolve); 
        setPlayer({
          symbol: token[1] as PlayerType
        });
        if(firstVisit) {
          history.push('/game/play')
        };
        firstVisit = false;
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
                  <GamesList heandlerNewGame={_heandlerNewGame} heandlerEnterTheGame={_heandlerEnterTheGame} message={message}/>
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