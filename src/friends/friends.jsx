import React, { useEffect, useState } from 'react';
import { AddFriendView } from './addFriend';
import { FriendListView } from './friendList';
import { FriendRequestsView } from './friendRequests';
import { FriendRequest } from './friendRequestObj';

export function Friends({ currentUser }) {
    const [users, setUsers] = useState(() => {
        const usersString = localStorage.getItem('userList');
        return usersString ? JSON.parse(usersString) : [];
    });
    const saveUsers = (updatedUsers) => {
        localStorage.setItem('userList', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    };
    const saveCurrentUser = (updatedUser) => {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    };
    useEffect(() => {
        if (currentUser.username === 'a' || currentUser.username === 'b') return;

        const timer = setTimeout(() => {
            const usersString = localStorage.getItem('userList');
            const currentUsers = usersString ? JSON.parse(usersString) : [];
            
            const currentUserObj = currentUsers.find(u => u.username === currentUser.username);
            if (!currentUserObj) return;

            const senders = ['a', 'b'];
            let updated = false;

            senders.forEach(senderUsername => {
                const senderUser = currentUsers.find(u => u.username === senderUsername);
                if (!senderUser) return;
                if (currentUserObj.username === senderUsername) return;
                if ((currentUserObj.friends || []).some(f => 
                    f.username === senderUsername
                )) return;
                if ((currentUserObj.friendRequests || []).some(
                    r => r.sender === senderUsername
                )) return;
                currentUserObj.friendRequests.push(
                    new FriendRequest(senderUser.name, senderUsername, currentUser.username)
                );
                updated = true;
            });

            if (updated) {
                const updatedUsers = currentUsers.map(u =>
                    u.username === currentUser.username ? currentUserObj : u
                );
                localStorage.setItem('userList', JSON.stringify(updatedUsers));
                localStorage.setItem('currentUser', JSON.stringify(currentUserObj));
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [currentUser.username]);
    
    return (
        <main className="views">
            <div>
                <h1>Friends</h1>
                <FriendListView friends={currentUser.friends} />
                <FriendRequestsView
                    currentUser={currentUser}
                    users={users}
                    saveUsers={saveUsers}
                    saveCurrentUser={saveCurrentUser}
                />
                <AddFriendView 
                    currentUser={currentUser} 
                    users={users}
                    saveUsers={saveUsers}
                    saveCurrentUser={saveCurrentUser}
                />
            </div>
        </main>
    );
}
