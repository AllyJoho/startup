import React from 'react';
import './friends.css'

export function FriendRequestsView(props) {
  return (
    <div>
        <h3 className="friendRequests">Friend Requests: 0</h3>
        <p>!!! This is one of the places the websocket will be implemented for real-time updates for friend requests.</p>
    </div>
  );
}