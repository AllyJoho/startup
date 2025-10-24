import React from 'react';
import './friends.css';

export function FriendListView({ friends }) {
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
