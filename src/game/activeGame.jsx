import React, { useState } from 'react';

export function ActiveGame({
    currentUser,
    games,
    users,
    saveGames,
    saveCurrentUser,
    gameId,
    onGameEnd,
}) {
    const [message, setMessage] = useState('');

    const game = games.find((g) => g.id === gameId);

    if (!game) {
        return <div>Game not found</div>;
    }

    const isCreator = game.creator === currentUser.username;

    const handleScoreChange = (username, operation, inputElement) => {
        const scoreValue = parseInt(inputElement.value || '1');

        const updatedGames = games.map((g) => {
            if (g.id !== gameId) return g;
            return {
                ...g,
                players: g.players.map((p) =>
                    p.username === username
                        ? {
                              ...p,
                              score:
                                  operation === 'add' ? p.score + scoreValue : p.score - scoreValue,
                          }
                        : p
                ),
            };
        });

        saveGames(updatedGames);
        inputElement.value = '';
    };

    const handleEndGame = async () => {
        // Sort to determine winner
        const sortedPlayers = [...game.players].sort((a, b) => {
            if (game.scoreType === 'low') {
                return a.score - b.score;
            } else {
                return b.score - a.score;
            }
        });

        const winner = sortedPlayers[0];
        const completedGame = {
            ...game,
            winner: winner.username,
            completedDate: new Date().toISOString(),
        };

        // Save to all players' histories
        const playerUsernames = game.players.map((p) => p.username);

        try {
            const response = await fetch('/api/addGame', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    game: completedGame,
                    playerUsernames: playerUsernames,
                }),
            });

            if (response.ok) {
                // Remove from local games list
                const updatedGames = games.filter((g) => g.id !== gameId);
                saveGames(updatedGames);
                onGameEnd();
            } else {
                setMessage('Failed to save game');
            }
        } catch (error) {
            console.error('Error ending game:', error);
            setMessage('Error ending game. Please try again.');
        }
    };

    return (
        <div id="current-game">
            <h1>{game.name}</h1>
            <p>
                For this game{' '}
                <span style={{ textDecoration: 'underline' }}>
                    {game.scoreType === 'low' ? 'lowest' : 'highest'} score wins
                </span>
            </p>
            <p>Players:</p>
            <div className="player-scores">
                {game.players.map((player) => (
                    <div key={player.username} className="player-row">
                        <span className="player-name">{player.name}:</span>
                        <span className="player-score">{player.score}</span>
                        <div className="score-controls">
                            <button
                                type="button"
                                onClick={(e) => {
                                    const input =
                                        e.target.parentElement.querySelector('.score-input');
                                    handleScoreChange(player.username, 'subtract', input);
                                }}
                                className="btn btn-sm btn-danger"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                placeholder="0"
                                className="score-input"
                                defaultValue=""
                            />
                            <button
                                type="button"
                                onClick={(e) => {
                                    const input =
                                        e.target.parentElement.querySelector('.score-input');
                                    handleScoreChange(player.username, 'add', input);
                                }}
                                className="btn btn-sm btn-success"
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <br />
            <button type="button" onClick={handleEndGame} className="btn btn-primary">
                End Game
            </button>
            {message && <div className="alert alert-info">{message}</div>}
        </div>
    );
}
