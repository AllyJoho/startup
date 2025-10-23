import React from 'react';

export function CreateGame(props) {
  return (
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
  );
}
