import React, { useState } from 'react';

export function ActiveGame({ currentUser, games, users, saveGames, saveCurrentUser, gameId, onGameEnd }) {
    const [scoreInput, setScoreInput] = useState('');
    
    const game = games.find(g => g.id === gameId);
    
    if (!game) {
        return <div>Game not found</div>;
    }
    
    const sortedPlayers = [...game.players].sort((a, b) => {
        if (game.scoreType === 'low') {
            return a.score - b.score;
        } else {
            return b.score - a.score;
        }
    });
    
    const handleScoreChange = (operation) => {
        const scoreValue = parseInt(scoreInput);
        if (isNaN(scoreValue)) {
            alert('Please enter a number');
            return;
        }
        const updatedGames = games.map(g => {
            if (g.id !== gameId) return g;
            return {
            ...g,
            players: g.players.map(p =>
                p.username === currentUser.username
                ? { ...p, score: operation === 'add' ? p.score + scoreValue : p.score - scoreValue }
                : p
            ),
            };
        });
        
        saveGames(updatedGames);
        setScoreInput('');
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
            <ol className="rank">
                {sortedPlayers.map((player) => (
                    <li 
                        key={player.username}
                        className={player.accepted ? 'active' : ''}
                    >
                        {player.name}: {player.score}
                    </li>
                ))}
            </ol>
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="player-score">Enter Your Score:</label>
                <input 
                    type="number" 
                    id="player-score" 
                    name="player-score" 
                    value={scoreInput}
                    onChange={(e) => setScoreInput(e.target.value)}
                    required 
                />
                <button 
                    type="button"
                    onClick={() => handleScoreChange('subtract')} 
                    className="btn btn-danger"
                >
                    Subtract Score
                </button>
                <button 
                    type="button"
                    onClick={() => handleScoreChange('add')} 
                    className="btn btn-success"
                >
                    Add Score
                </button>
            </form>
        </div>
    );
}
