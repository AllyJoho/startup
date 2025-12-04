import React, { useState, useEffect } from 'react';
import './friends.css';
import { Notifier, NotificationEvent } from './notifier';

export function FriendListView({ refreshTrigger, currentUser }) {
    const [friends, setFriends] = useState([]);

    const fetchFriends = () => {
        fetch('/api/friends')
            .then((response) => response.json())
            .then((friendsList) => {
                setFriends(friendsList);
            });
    };

    useEffect(() => {
        fetchFriends();

        const handleNotification = (event) => {
            if (
                event.type === NotificationEvent.FriendAccepted &&
                event.data.senderUsername === currentUser.username
            ) {
                fetchFriends();
            }
        };

        Notifier.addHandler(handleNotification);

        return () => {
            Notifier.removeHandler(handleNotification);
        };
    }, [currentUser.username]);

    useEffect(() => {
        fetchFriends();
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
