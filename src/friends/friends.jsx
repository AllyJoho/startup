import React from 'react';
import './friends.css'

export function Friends() {
  return (
    <main className="views">
      <div>
        <h1>Friends</h1>
        <p>You have no friends yet. Start by adding some! If it's not working, please make sure you're logged in.</p>
        <p>OR</p>
        <p>You have __ friends. Add some more here!</p>
        <ul class="friends">
          <li>!!! Friend information will be here with DB data implementation.</li>
          <li>Friends listed will be in a bullet point like this.</li>
          <li>Todd</li>
        </ul>
        <br />
        <h3 class="friendRequests">Friend Requests: 0</h3>
        <p>!!! This is one of the places the websocket will be implemented for real-time updates for friend requests.</p>
        <br />
        <form action="friends.html">
            <label for="friend-username">Add Friend by Username:</label>
            <input type="text" id="friend-username" name="friend-username" />
            <button type="submit" class="btn btn-primary">Send Friend Request</button>
        </form>
        <p>!!! DB data implementation will be used here for connecting to new friends.</p>
      </div>
    </main>
  );
}