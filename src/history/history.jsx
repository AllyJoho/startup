import React, { useState, useEffect } from 'react';
import './history.css';

export function History({ currentUser }) {
    const [finishedGames, setFinishedGames] = useState([]);
    
    useEffect(() => {
        const gamesString = localStorage.getItem('gameList');
        const allGames = gamesString ? JSON.parse(gamesString) : [];
        
        const userFinishedGames = allGames.filter(g => 
            g.status === 'finished' && 
            g.players.some(p => p.username === currentUser.username)
        );
        
        setFinishedGames(userFinishedGames);
    }, [currentUser.username]);
    
    return (
        <main className="views">
            <div>
                <h1>Past Games</h1>
                <p>
                    Here are your past games. Add more by playing some! If it's not working, please
                    make sure you're logged in.
                </p>
                
                {finishedGames.length === 0 ? (
                    <p>No finished games yet. Play some games to see your history!</p>
                ) : (
                    finishedGames.map(game => {
                        const sortedPlayers = [...game.players].sort((a, b) => {
                            if (game.scoreType === 'low') {
                                return a.score - b.score;
                            } else {
                                return b.score - a.score;
                            }
                        });
                        
                        const winner = sortedPlayers[0];
                        
                        return (
                            <div key={game.id} className="gameHistory">
                                <h3>{game.name}</h3>
                                <span className="winner">{winner.name} WON!</span>
                                <h5>You played with:</h5>
                                <ol className="rank">
                                    {sortedPlayers.map(player => (
                                        <li key={player.username}>
                                            {player.name}: {player.score}
                                            {player.username === currentUser.username && ' (You)'}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        );
                    })
                )}
            </div>
            <button
                onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                }}
            >
                Clear All Data for testing purposes
            </button>
        </main>
    );
}
