import React from 'react';
import './history.css'

export function History() {
  return (
    <main className="views">
      <div>
        <h1>Past Games</h1>
        <p>Here are your past games. Add more by playing some! If it's not working, please make sure you're logged in.</p>
        <p>!!! Game information will be here with DB data implementation.</p>
        <div className="gameHistory">
            <h3>Game Name Here</h3>
            <span className="winner">Ted WON!</span>
            <h5>You played with:</h5>
            <ol className="rank">
                <li>Ted: 10</li>
                <li>Abbie(You): 8</li>
                <li>Josh: 5</li>
                <li>Tris: 3</li>
            </ol>
        </div>
      </div>
      <button onClick={() =>{localStorage.clear();}}>Button of mystery</button>
    </main>
  );
}