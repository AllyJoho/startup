import React from 'react';
import './friends.css';

export function FriendRequestsView({ currentUser }) {
    let usersString = localStorage.getItem('userList');
    let users = usersString ? JSON.parse(usersString) : [];

    const saveUsers = (updatedUsers) => {
        localStorage.setItem('userList', JSON.stringify(updatedUsers));
    };
    const saveCurrentUser = (updatedUser) => {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    };

    const acceptFriendRequest = (request) => {
        const currentUserObj = users.find(u => u.username === currentUser.username);
        const senderObj = users.find(u => u.username === request.sender);
        
        if (!currentUserObj.friends.includes(request.sender)) {
            currentUserObj.friends.push(request.sender);
        }
        if (!senderObj.friends.includes(currentUser.username)) {
            senderObj.friends.push(currentUser.username);
        }

        currentUserObj.friendRequests = currentUserObj.friendRequests.filter(
            r => r.sender !== request.sender
        );
        
        saveUsers(users);
        saveCurrentUser(currentUserObj);
    };

    const declineFriendRequest = (request) => {
        const currentUserObj = users.find(u => u.username === currentUser.username);
        currentUserObj.friendRequests = currentUserObj.friendRequests.filter(
            r => r.sender !== request.sender
        );
        
        saveUsers(users);
        saveCurrentUser(currentUserObj);
    };
    return (
        <div>
            <h3 className="friendRequests">Friend Requests: {currentUser.friendRequests.length}</h3>
            {currentUser.friendRequests.map((request, index) => (
                <div key={index} className="request">
                    <span>{request.sender} wants to be your friend!</span>
                    <button onClick={() => acceptFriendRequest(request)} className="btn btn-success">Accept</button>
                    <button onClick={() => declineFriendRequest(request)} className="btn btn-danger">Decline</button>
                </div>
            ))}
        </div>
    );
}
