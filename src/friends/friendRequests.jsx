import React, { useState } from 'react';
import './friends.css';

export function FriendRequestsView({ currentUser, users, saveUsers, saveCurrentUser }) {
    const [requests, setRequests] = useState(currentUser.friendRequests);

    const acceptFriendRequest = (request) => {
        const currentUserObj = users.find(u => u.username === currentUser.username);
        const senderObj = users.find(u => u.username === request.sender);
        
        if (senderObj && !currentUserObj.friends.some(f => f.username === senderObj.username)) {
            currentUserObj.friends.push({
            username: senderObj.username,
            name: senderObj.name,
            age: senderObj.age
            });
        }
        if (senderObj && !senderObj.friends.some(f => f.username === currentUserObj.username)) {
            senderObj.friends.push({
            username: currentUserObj.username,
            name: currentUserObj.name,
            age: currentUserObj.age
            });
        }

        currentUserObj.friendRequests = currentUserObj.friendRequests.filter(
            r => r.sender !== request.sender
        );
        
        saveUsers(users);
        saveCurrentUser(currentUserObj);
        setRequests(currentUserObj.friendRequests);
    };

    const declineFriendRequest = (request) => {
        const currentUserObj = users.find(u => u.username === currentUser.username);
        currentUserObj.friendRequests = currentUserObj.friendRequests.filter(
            r => r.sender !== request.sender
        );
        
        saveUsers(users);
        saveCurrentUser(currentUserObj);
        setRequests(currentUserObj.friendRequests);
    };
    return (
        <div>
            <h3 className="friendRequests">Friend Requests: {requests.length}</h3>
            {requests.map((request, index) => (
                <div key={index} className="request">
                    <span>{request.senderName || request.sender} wants to be your friend!</span>
                    <button onClick={() => acceptFriendRequest(request)} className="btn btn-success">Accept</button>
                    <button onClick={() => declineFriendRequest(request)} className="btn btn-danger">Decline</button>
                </div>
            ))}
        </div>
    );
}
