import React from 'react';
import Button from 'react-bootstrap/Button';

export function Authenticated({ currentUser, onLogout }) {
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const friendsCount = currentUser.friends ? currentUser.friends.length : 0;
  const gamesPlayed = currentUser.games ? currentUser.games.length : 0;
  const gamesWon = currentUser.games ? currentUser.games.filter(game => game.won).length : 0;

  return (
    <div id="logged-in">
        <h1>Welcome Back,<br/>{currentUser.name || currentUser.username}!</h1>
        <p>Friends: {friendsCount}</p>
        <p>Age: {currentUser.age || 'N/A'}</p>
        <p>Games Played: {gamesPlayed}</p>
        <p>Games Won: {gamesWon}</p>
        <Button variant='secondary' onClick={onLogout}>
            Logout
        </Button>
    </div>
  );
}
