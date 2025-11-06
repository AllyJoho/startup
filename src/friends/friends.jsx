import React, { useEffect, useState } from 'react';
import { AddFriendView } from './addFriend';
import { FriendListView } from './friendList';
import { FriendRequestsView } from './friendRequests';

export function Friends({ currentUser }) {
    const [users, setUsers] = useState(() => {
        const usersString = localStorage.getItem('userList');
        return usersString ? JSON.parse(usersString) : [];
    });
    const [friendsRefreshTrigger, setFriendsRefreshTrigger] = useState(0);

    const saveUsers = (updatedUsers) => {
        localStorage.setItem('userList', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    };
    const saveCurrentUser = (updatedUser) => {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    };

    const refreshFriends = () => {
        setFriendsRefreshTrigger(prev => prev === 0 ? 1 : 0);
    };

    return (
        <main className="views">
            <div>
                <h1>Friends</h1>
                <FriendListView refreshTrigger={friendsRefreshTrigger} />
                <FriendRequestsView
                    onFriendAccepted={refreshFriends}
                    currentUser={currentUser}
                    users={users}
                    saveUsers={saveUsers}
                    saveCurrentUser={saveCurrentUser}
                />
                <AddFriendView
                    currentUser={currentUser}
                    users={users}
                    saveUsers={saveUsers}
                    saveCurrentUser={saveCurrentUser}
                />
            </div>
        </main>
    );
}
