import React from 'react';

export function NoGame(props) {
  return (
    <div id="no-current-games">
        <h1>No Current Games</h1>
        <p>There are no ongoing games for you. You can start a new game, or if someone else is adding you to your game you can wait here.</p>
        <p>If something doesn't seem right, please refresh the page or make sure you're logged in.</p>
        <p>!!! This is where the websocket will be implemented for real-time updates for game invitations.</p>
        <button  className="btn btn-primary">Create New Game</button>
    </div>
  );
}
