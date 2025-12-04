import React, { useState, useEffect } from 'react';
import { NoGame } from './noGame';
import { CreateGame } from './createGame';
import { ActiveGame } from './activeGame';
import './game.css';

export function Game({ currentUser }) {
    const [games, setGames] = useState(() => {
        const gamesString = localStorage.getItem('gameList');
        return gamesString ? JSON.parse(gamesString) : [];
    });

    const [users, setUsers] = useState(() => {
        const usersString = localStorage.getItem('userList');
        return usersString ? JSON.parse(usersString) : [];
    });

    const [currentGameId, setCurrentGameId] = useState(null);
    const [view, setView] = useState('no-game');

    useEffect(() => {
        // const activeGame = games.find(
        //     (g) =>
        //         g.status === 'active' && g.players.find((p) => p.username === currentUser.username)
        // );
        const activeGame = games.find((g) => g.creator === currentUser.username);
        if (activeGame) {
            setCurrentGameId(activeGame.id);
            setView('active');
        }
    }, []);

    const saveGames = (updatedGames) => {
        localStorage.setItem('gameList', JSON.stringify(updatedGames));
        setGames(updatedGames);
    };

    const saveUsers = (updatedUsers) => {
        localStorage.setItem('userList', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    };

    const saveCurrentUser = (updatedUser) => {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
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
                    games={games}
                    users={users}
                    saveGames={saveGames}
                    setGameId={setCurrentGameId}
                    onCreateGame={handleSetCreate}
                    onInviteAccepted={handleSetActive}
                />
            )}
            {view === 'create' && (
                <CreateGame
                    currentUser={currentUser}
                    games={games}
                    users={users}
                    saveGames={saveGames}
                    saveCurrentUser={saveCurrentUser}
                    setGameId={setCurrentGameId}
                    onGameCreated={handleSetActive}
                    onCancel={handleSetNoGame}
                />
            )}
            {view === 'active' && currentGameId && (
                <ActiveGame
                    currentUser={currentUser}
                    games={games}
                    users={users}
                    saveGames={saveGames}
                    saveCurrentUser={saveCurrentUser}
                    gameId={currentGameId}
                    onGameEnd={handleSetNoGame}
                />
            )}
        </main>
    );
}
