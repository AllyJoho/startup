import React, { useState } from 'react';
import './friends.css';

import { FriendRequest } from './friendRequestObj';

export function AddFriendView({ currentUser, users, saveUsers, saveCurrentUser }) {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        setMessage('');
        if (!username) {
            setMessage('Please enter a username.');
            return;
        }
        if (username === currentUser.username) {
            setMessage('You cannot add yourself.');
            return;
        }
        const recipient = users.find((u) => u.username === username);
        if (!recipient) {
            setMessage('User not found.');
            return;
        }
        const alreadyRequested = (recipient.friendRequests || []).some(
            (fr) => fr.sender === currentUser.username
        );
        if (alreadyRequested) {
            setMessage('Friend request already sent.');
            return;
        }

        const newRequest = new FriendRequest(
            currentUser.name,
            currentUser.username,
            recipient.username
        );
        if (!recipient.friendRequests) recipient.friendRequests = [];
        recipient.friendRequests.push(newRequest);

        const updatedUsers = users.map((u) => (u.username === recipient.username ? recipient : u));
        saveUsers(updatedUsers);
        setMessage('Friend request sent!');
        setUsername('');
        saveCurrentUser(currentUser);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="friend-username">Add Friend by Username:</label>
                <input
                    type="text"
                    id="friend-username"
                    name="friend-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                    Send Friend Request
                </button>
            </form>
            {message && <div className="alert alert-info">{message}</div>}
        </div>
    );
}
