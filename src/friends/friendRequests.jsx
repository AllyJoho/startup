import React, { useState, useEffect } from 'react';
import './friends.css';
import { Notifier, NotificationEvent } from './notifier';

export function FriendRequestsView({ currentUser, onFriendAccepted }) {
    const [requests, setRequests] = useState([]);

    const fetchRequests = () => {
        fetch('/api/friendRequests')
            .then((response) => response.json())
            .then((friends) => {
                setRequests(friends);
            });
    };

    useEffect(() => {
        fetchRequests();

        const handleNotification = (event) => {
            if (
                event.type === NotificationEvent.FriendRequest &&
                event.data.recipientUsername === currentUser.username
            ) {
                fetchRequests();
            }
        };

        Notifier.addHandler(handleNotification);

        return () => {
            Notifier.removeHandler(handleNotification);
        };
    }, [currentUser.username]);

    useEffect(() => {
        fetchRequests();
    }, [onFriendAccepted]);

    const acceptFriendRequest = async (request) => {
        const response = await fetch('/api/acceptFriendRequest', {
            method: 'POST',
            body: JSON.stringify({
                request: request,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            fetchRequests();
            if (onFriendAccepted) onFriendAccepted();
            Notifier.broadcastEvent(NotificationEvent.FriendAccepted, {
                senderUsername: request.senderUsername,
                acceptedBy: currentUser.username,
                acceptedByName: currentUser.name,
            });
        }
        console.log(response);
    };

    const declineFriendRequest = async (request) => {
        const response = await fetch('/api/rejectFriendRequest', {
            method: 'POST',
            body: JSON.stringify({
                request: request,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            fetchRequests();
        }
        console.log(response);
    };

    return (
        <div>
            <h3 className="friendRequests">Friend Requests: {requests.length}</h3>
            {requests.map((request, index) => (
                <div key={index} className="request">
                    <span>{request.senderName || request.sender} wants to be your friend!</span>
                    <button
                        onClick={() => acceptFriendRequest(request)}
                        className="btn btn-success"
                    >
                        Accept
                    </button>
                    <button
                        onClick={() => declineFriendRequest(request)}
                        className="btn btn-danger"
                    >
                        Decline
                    </button>
                </div>
            ))}
        </div>
    );
}
