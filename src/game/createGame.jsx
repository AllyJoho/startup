import React, { useState } from 'react';
import { Game } from './gameObj';

export function CreateGame({
    currentUser,
    games,
    users,
    saveGames,
    saveCurrentUser,
    setGameId,
    onGameCreated,
    onCancel,
}) {
    const [gameName, setGameName] = useState('');
    const [scoreType, setScoreType] = useState('low');
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [message, setMessage] = useState('');

    const handleFriendToggle = (friendUsername) => {
        if (selectedFriends.includes(friendUsername)) {
            setSelectedFriends(selectedFriends.filter((f) => f !== friendUsername));
        } else {
            setSelectedFriends([...selectedFriends, friendUsername]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        if (!gameName.trim()) {
            setMessage('Game name is required');
            return;
        }

        if (selectedFriends.length === 0) {
            setMessage('Friends required');
            return;
        }

        const gameId = 'game_' + Date.now();
        const players = [
            { username: currentUser.username, name: currentUser.name, score: 0, accepted: true },
            ...selectedFriends.map((username) => {
                const friend = users.find((u) => u.username === username);
                return { username, name: friend?.name || username, score: 0, accepted: false };
            }),
        ];

        const newGame = new Game(gameId, gameName, scoreType, currentUser.username, players);
        newGame.status = 'pending';

        const updatedGames = [...games, newGame];
        saveGames(updatedGames);
        setGameId(gameId);
        onGameCreated();
    };

    return (
        <div id="create-game">
            <h1>Create Game</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="game-name">Game Name:</label>
                <input
                    type="text"
                    id="game-name"
                    name="game-name"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                />

                {/* high low */}
                <div className="btn-group">
                    <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="low"
                        autoComplete="off"
                        checked={scoreType === 'low'}
                        onChange={() => setScoreType('low')}
                    />
                    <label className="btn btn-outline-primary" htmlFor="low">
                        Lowest Score Wins
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="high"
                        autoComplete="off"
                        checked={scoreType === 'high'}
                        onChange={() => setScoreType('high')}
                    />
                    <label className="btn btn-outline-primary" htmlFor="high">
                        Highest Score Wins
                    </label>
                </div>

                <div className="friends-selection">
                    <h3>Select Friends to Invite:</h3>
                    {currentUser.friends.length === 0 ? (
                        <p>You need to have friends to play with them!</p>
                    ) : (
                        <div className="friend-checkboxes">
                            {currentUser.friends.map((friend) => (
                                <div key={friend.username}>
                                    <input
                                        type="checkbox"
                                        id={`friend-${friend.username}`}
                                        checked={selectedFriends.includes(friend.username)}
                                        onChange={() => handleFriendToggle(friend.username)}
                                    />
                                    <label htmlFor={`friend-${friend.username}`}>
                                        {friend.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button type="submit" className="btn btn-success">
                    Create Game
                </button>
                <br />
                <br />
                <button type="button" onClick={onCancel} className="btn btn-secondary">
                    Cancel
                </button>
                {message && <div className="alert alert-info">{message}</div>}
            </form>
        </div>
    );
}
