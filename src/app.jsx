import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Welcome } from './welcome/welcome';
import { History } from './history/history';
import { Game } from './game/game';
import { Friends } from './friends/friends';
import { NavigateLink } from './components/navlink';

export default function App() {
  return (
    <BrowserRouter>
      <div className="body">
        <header>
          <nav className="navbar navbar-expand-lg" id="desktop-nav">
            <div className="container-fluid">
              <span className="navbar-head">Scorekeep</span>
              <ul className="navbar-nav ms-auto flex-row">
                <NavigateLink title=''>Home</NavigateLink>
                <NavigateLink title='friends'>Friends</NavigateLink>
                <NavigateLink title='game'>Game</NavigateLink>
                <NavigateLink title='history'>History</NavigateLink>
              </ul>
            </div>
          </nav>
          <nav className="navbar navbar-expand-lg" id="mobile-nav">
            <div className="container-fluid">
              <ul className="navbar-nav ms-auto flex-row">
                <NavigateLink title=''><img src="home.png" alt="Home" /></NavigateLink>
                <NavigateLink title='friends'><img src="friends.png" alt="Friends" /></NavigateLink>
                <NavigateLink title='game'><img src="trophy.png" alt="Trophy" /></NavigateLink>
                <NavigateLink title='history'><img src="history.png" alt="History" /></NavigateLink>
              </ul>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Welcome />} exact />
          <Route path='/history' element={<History />} />
          <Route path='/game' element={<Game />} />
          <Route path='/friends' element={<Friends />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
          <div className="container-fluid">
            <span className="text-reset">This project is maintained by Allison Johanson</span>
            <a className="text-reset" href="https://github.com/AllyJoho/startup.git">
              (Github)
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}