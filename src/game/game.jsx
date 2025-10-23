import React from 'react';
import { NoGame } from './noGame';
import { CreateGame } from './createGame';
import { ActiveGame } from './activeGame';
import './game.css';

// function getGames() {
//   const games = localStorage.getItem('gameList');
//   return games ? JSON.parse(games) : [];
// }

export function Game({ currentUser }) {
  const [currentGameId, setCurrentGameId] = useState(null);
  const [view, setView] = useState('no-game'); // 'no-game', 'create', 'active'

  const handleCreateGame = (game) => {
    setView('create');
  };

  const handleGameCreated = (game) => {
    setView('active');
  };

  const handleGameEnd = () => {
    setView('no-game');
  };

  if (!currentUser) {
    return (
      <NoGame onCreateGame={handleCreateGame} vaid={false} />
    );
  }

  return (
    <main className="views">
      {view === 'no-game' && (
        <NoGame onCreateGame={handleCreateGame} vaid={true} />
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