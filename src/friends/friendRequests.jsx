import React from 'react';
import './friends.css'

export function FriendRequestsView({ currentUser }) {
    const acceptFriendRequest = (request) => {
        return;
    }
    const declineFriendRequest = (request) => {
        return;
    }
    return (
        <div>
            <h3 className="friendRequests">Friend Requests: {currentUser.friendRequests.length}</h3>
            {currentUser.friendRequests.map((request, index) => (
                <div key={index} className="request">
                    <span>{request.sender} wants to be your friend!</span>
                    <button onClick={() => acceptFriendRequest(request)}>Accept</button>
                    <button onClick={() => declineFriendRequest(request)}>Decline</button>
                </div>
            ))}
        </div>
    );
}