import React, { useState } from 'react';
import './friends.css';

export function AddFriendView({ currentUser }) {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    async function AddFriend(username) {
        const response = await fetch('/api/sendFriendRequest', {
            method: 'post',
            body: JSON.stringify({ username: username }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            setMessage('Friend request sent!');
        } else {
            const body = await response.json();
            setMessage(body.msg);
        }
        console.log(response);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setMessage('');
        if (!username) {
            setMessage('Please enter a username.');
            return;
        }
        AddFriend(username);
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
