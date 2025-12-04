import React, { useEffect, useState } from 'react';
import { AddFriendView } from './addFriend';
import { FriendListView } from './friendList';
import { FriendRequestsView } from './friendRequests';

export function Friends({ currentUser }) {
    const [friendsRefreshTrigger, setFriendsRefreshTrigger] = useState(0);

    const refreshFriends = () => {
        setFriendsRefreshTrigger((prev) => (prev === 0 ? 1 : 0));
    };

    return (
        <main className="views">
            <div>
                <h1>Friends</h1>
                <FriendListView refreshTrigger={friendsRefreshTrigger} currentUser={currentUser} />
                <FriendRequestsView onFriendAccepted={refreshFriends} currentUser={currentUser} />
                <AddFriendView currentUser={currentUser} />
            </div>
        </main>
    );
}
