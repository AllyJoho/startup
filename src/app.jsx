import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Welcome } from './welcome/welcome';
import { History } from './history/history';
import { Game } from './game/game';
import { Friends } from './friends/friends';
import { NavigateLink } from './components/navlink';
import { Users } from './welcome/userObj';

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [loggedin, setLoggedin] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        console.log('Checking authentication...');
        fetch('/api/currentUser')
            .then((response) => {
                console.log('Auth response status:', response.status);
                if (response.ok) {
                    return response.json();
                } else {
                    console.log('User not authenticated');
                    return null;
                }
            })
            .then((user) => {
                console.log('User data:', user);
                setCurrentUser(user);
                setLoggedin(!!user);
                setAuthChecked(true);
            })
            .catch((error) => {
                console.error('Error checking authentication:', error);
                setCurrentUser(null);
                setLoggedin(false);
                setAuthChecked(true);
            });
    }, []);

    const handleLogin = (user) => {
        fetch('/api/currentUser')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then((user) => {
                setCurrentUser(user);
                setLoggedin(!!user);
            })
            .catch((error) => {
                console.error('Error after login:', error);
                setCurrentUser(null);
                setLoggedin(false);
            });
    };

    const handleLogout = () => {
        fetch(`/api/auth/logout`, {
            method: 'delete',
        })
            .catch(() => {
                // Logout failed. Assuming offline
            })
            .finally(() => {
                setCurrentUser(null);
                setLoggedin(false);
            });
    };

    return (
        <BrowserRouter>
            <div className="body">
                <header>
                    <nav className="navbar navbar-expand-lg" id="desktop-nav">
                        <div className="container-fluid">
                            <span className="navbar-head">Scorekeep</span>
                            <ul className="navbar-nav ms-auto flex-row">
                                <NavigateLink title="">Home</NavigateLink>
                                <NavigateLink title="friends">Friends</NavigateLink>
                                <NavigateLink title="game">Game</NavigateLink>
                                <NavigateLink title="history">History</NavigateLink>
                            </ul>
                        </div>
                    </nav>
                    <nav className="navbar navbar-expand-lg" id="mobile-nav">
                        <div className="container-fluid">
                            <ul className="navbar-nav ms-auto flex-row">
                                <NavigateLink title="">
                                    <img src="home.png" alt="Home" />
                                </NavigateLink>
                                <NavigateLink title="friends">
                                    <img src="friends.png" alt="Friends" />
                                </NavigateLink>
                                <NavigateLink title="game">
                                    <img src="trophy.png" alt="Trophy" />
                                </NavigateLink>
                                <NavigateLink title="history">
                                    <img src="history.png" alt="History" />
                                </NavigateLink>
                            </ul>
                        </div>
                    </nav>
                </header>

                <Routes>
                    <Route
                        path="/"
                        element={
                            authChecked ? (
                                <Welcome
                                    currentUser={currentUser}
                                    onLogin={handleLogin}
                                    onLogout={handleLogout}
                                />
                            ) : (
                                <div className="loading">Loading...</div>
                            )
                        }
                        exact
                    />
                    <Route
                        path="/history"
                        element={
                            loggedin || currentUser ? (
                                <History currentUser={currentUser} />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                    <Route
                        path="/game"
                        element={
                            loggedin || currentUser ? (
                                <Game currentUser={currentUser} />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                    <Route
                        path="/friends"
                        element={
                            loggedin || currentUser ? (
                                <Friends currentUser={currentUser} />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>

                <footer>
                    <div className="container-fluid">
                        <span className="text-reset">
                            This project is maintained by Allison Johanson
                        </span>
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
    return (
        <main className="container-fluid bg-secondary text-center">
            404: Return to sender. Address unknown.
        </main>
    );
}
