import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Welcome } from './welcome/welcome';
import { History } from './history/history';
import { Game } from './game/game';
import { Friends } from './friends/friends';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <nav className="navbar navbar-expand-lg" id="desktop-nav">
            <div className="container-fluid">
              <span className="navbar-head">Scorekeep</span>
              <ul className="navbar-nav ms-auto flex-row">
                <li className="nav-item"><NavLink className="nav-link" to=''>Home</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to='friends'>Friends</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to='game'>Game</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to='history'>History</NavLink></li>
              </ul>
            </div>
          </nav>
          <nav className="navbar navbar-expand-lg" id="mobile-nav">
            <div className="container-fluid">
              <ul className="navbar-nav ms-auto flex-row">
                <li className="nav-item"><NavLink className="nav-link" to=''><img src="../images/home.png" alt="Home" /></NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to='friends'><img src="../images/friends.png" alt="Friends" /></NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to='game'><img src="../images/trophy.png" alt="Trophy" /></NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to='history'><img src="../images/history.png" alt="History" /></NavLink></li>
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
          <hr />
          <span>This project is maintained by Allison Johanson</span>
          <br />
          <a href="https://github.com/AllyJoho/startup.git">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}