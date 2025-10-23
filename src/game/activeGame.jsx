import React from 'react';

export function ActiveGame(props) {
  return (
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
  );
}
