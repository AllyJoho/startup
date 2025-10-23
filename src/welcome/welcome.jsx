import React from 'react';
import { Authenticated } from './authenticated';
import Unauthenticated from './unauthenticated';

export function Welcome({ currentUser, onLogin, onLogout }) {
  return (
    <main className="views">
      {currentUser ? (
        <Authenticated currentUser={currentUser} onLogout={onLogout} />
      ) : (
        <Unauthenticated onLogin={onLogin} />
      )}
    </main>
  );
}