import React, { useState } from 'react';
import { NoGame } from './noGame';
import { CreateGame } from './createGame';
import { ActiveGame } from './activeGame';
import './game.css';

function getGames() {
    const games = localStorage.getItem('gameList');
    return games ? JSON.parse(games) : [];
}

export function Game({ currentUser }) {
    const [games, setGames] = useState(getGames());
    const [currentGameId, setCurrentGameId] = useState(null);
    const [view, setView] = useState('no-game'); // 'no-game', 'create', 'active'

    const updateGames = (newGames) => {
        setGames(newGames);
        localStorage.setItem('gameList', JSON.stringify(newGames));
    };

    const handleSetCreate = (game) => {
        setView('create');
    };

    const handleSetActive = (game) => {
        setView('active');
    };

    const handleSetNoGame = () => {
        setView('no-game');
    };

    return (
        <main className="views">
            {view === 'no-game' && (
                <NoGame
                    currentUser={currentUser}
                    onCreateGame={handleSetCreate}
                    onInviteAccepted={handleSetActive}
                />
            )}
            {view === 'create' && (
                <CreateGame
                    currentUser={currentUser}
                    onGameCreated={handleGameCreated}
                    onCancel={() => setView('no-game')}
                />
            )}
            {view === 'active' && currentGameId && (
                <ActiveGame
                    currentUser={currentUser}
                    gameId={currentGameId}
                    onGameEnd={handleGameEnd}
                />
            )}
        </main>
    );
}
