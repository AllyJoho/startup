import React from 'react';
import './game.css'


export function Game() {
  return (
    <main className="views">
        {/* <!-- View if game not started, and no requests to join --> */}
        <div id="no-current-games">
            <h1>No Current Games</h1>
            <p>There are no ongoing games for you. You can start a new game, or if someone else is adding you to your game you can wait here.</p>
            <p>If something doesn't seem right, please refresh the page or make sure you're logged in.</p>
            <p>!!! This is where the websocket will be implemented for real-time updates for game invitations.</p>
            <button  className="btn btn-primary">Create New Game</button>
        </div>
        <hr />
        {/* <!-- View if game not started, and no requests to join --> */}
        <div id="create-game">
            <h1>Create Game</h1>
            <form action="">
                <label htmlFor="game-name">Game Name:</label>
                <input type="text" id="game-name" name="game-name" required />
                <div className="btn-group">
                  <input type="radio" className="btn-check" name="btnradio" id="low" autoComplete="off" defaultChecked />
                  <label className="btn btn-outline-primary" htmlFor="low">Lowest Score Wins</label>

                  <input type="radio" className="btn-check" name="btnradio" id="high" autoComplete="off"/>
                  <label className="btn btn-outline-primary" htmlFor="high">Highest Score Wins</label>
                </div>
                <p>!!! DB data implementation will be used here for adding your friends to the game.</p>
                <button type="submit" className="btn btn-success">Create Game</button>
            </form>
        </div>
        <hr />
        {/* <!-- View if game started --> */}
        <div id="current-game">
            <h1>Game Name Here</h1>
            <p>For this game <span style={{ textDecoration: 'underline' }}>highest score wins</span></p>
            <p>Players:</p>
            <ol className="rank">
                <li>Player 1: Score Here</li>
                <li>Player 2: Score Here</li>
                <li>Player 3: Score Here</li>
                <li>Player 4: Score Here</li>
            </ol>
            <form action="">
                <label htmlFor="player-score">Enter Your Score:</label>
                <input type="number" id="player-score" name="player-score" required />
                <button type="submit" className="btn btn-danger">Subtract Score</button>
                <button type="submit" className="btn btn-success">Add Score</button>
                <p>!!! DB data implementation will be used here for updating the player's score.</p>
            </form>
            <p>!!! WebSocket implementation will be used here for real-time score updates.</p>
        </div>
    </main>
  );
}