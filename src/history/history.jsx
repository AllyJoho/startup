import React, { useState, useEffect } from 'react';
import './history.css';

export function History({ currentUser }) {
    const [finishedGames, setFinishedGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('/api/games');
                if (response.ok) {
                    const games = await response.json();
                    setFinishedGames(games);
                } else {
                    console.error('Failed to fetch games');
                    setFinishedGames([]);
                }
            } catch (error) {
                console.error('Error fetching games:', error);
                setFinishedGames([]);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

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
                    finishedGames.map((game) => {
                        const gameDate = game.completedDate
                            ? new Date(game.completedDate).toLocaleDateString()
                            : 'Date unknown';
                        const winnerPlayer = game.players.find((p) => p.username === game.winner);

                        const sortedPlayers = [...game.players].sort((a, b) => {
                            if (game.scoreType === 'low') {
                                return a.score - b.score;
                            } else {
                                return b.score - a.score;
                            }
                        });

                        return (
                            <div key={game.id} className="gameHistory">
                                <h3>{game.name}</h3>
                                <p className="game-date">{gameDate}</p>
                                <span className="winner">
                                    {winnerPlayer?.name || 'Unknown'} WON!
                                </span>
                                <h5>Final Scores:</h5>
                                <ol className="rank">
                                    {sortedPlayers.map((player) => (
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
        </main>
    );
}
