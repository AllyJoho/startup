import React from 'react';
import { AddFriendView } from './addFriend';
import { FriendListView } from './friendList';
import { FriendRequestsView } from './friendRequests';

function saveCurrentUserToLocalStorage(user) {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}

export function Friends({ currentUser }) {
  return (
    <main className="views">
      <div>
        <h1>Friends</h1>
        <FriendListView friends={currentUser.friends} />
        <FriendRequestsView friendRequests={currentUser.friendRequests} save={saveCurrentUserToLocalStorage} />
        <AddFriendView currentUser={currentUser} save={saveCurrentUserToLocalStorage} />
      </div>
    </main>
  );
}