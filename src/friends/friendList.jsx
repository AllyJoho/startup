import React, { useState, useEffect } from 'react';
import './friends.css';

export function FriendListView({ refreshTrigger }) {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        fetch('/api/friends')
        .then((response) => response.json())
        .then((friends) => {
            setFriends(friends);
        });
    }, [refreshTrigger]);

    return (
        <div>
            <p>You have {friends.length} friends. Add some more here!</p>
            <ul className="friends">
                {friends.map((friend, index) => (
                    <li key={index}>{friend.name}</li>
                ))}
            </ul>
        </div>
    );
}
