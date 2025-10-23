import React, { useState } from 'react';
import { Users } from './userObj';
import "./welcome.css"

function getUserList() {
    const list = localStorage.getItem('userList');
    return list ? JSON.parse(list) : [];
}

function saveUserList(list) {
    localStorage.setItem('userList', JSON.stringify(list));
}

export default function Unauthenticated({ onLogin }) {
    const [isNewUser, setIsNewUser] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        setError('');
        let userList = getUserList();

        if (!name.trim()) {
            setError('Name is required');
            return;
        }
        if (!username.trim()) {
            setError('Username is required');
            return;
        }
        if (!password) {
            setError('Password is required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (userList.find(u => u.username === username)) {
            setError('Username already taken');
            return;
        }

        const newUser = new Users(name, username, password);
        userList.push(newUser);
        saveUserList(userList);

        localStorage.setItem('currentUser', JSON.stringify(newUser));
        onLogin(newUser);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!username.trim()) {
            setError('Username required');
            return;
        }
        if (!password) {
            setError('Password required');
            return;
        }

        let userList = getUserList();
        let user = userList.find(u => u.username === username && u.password === password);

        if (!user) {
            setError('Invalid username or password');
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(user));
        onLogin(user);
    };

    const toggleView = () => {
        setIsNewUser(!isNewUser);
        setError('');
        setName('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    };

    if (isNewUser) {
        // Signup View
        return (
            <div id="new-user">
                <h1>Hello New User!</h1>
                <p>You don't have an account yet. Please enter your details below to create one.</p>
                <button className="btn btn-primary" type="button" onClick={toggleView}>
                    I have an account
                </button>
                <form onSubmit={handleSignup}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm-password">Confirm password:</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">
                        Create Account
                    </button>
                    {error && <div className='error'>{error}</div>}
                </form>
            </div>
        );
    } else {
        // Login View
        return (
            <div id="returning-user">
                <h1>Welcome Back!</h1>
                <p>Please enter your username and password to log in.</p>
                <button className="btn btn-primary" type="button" onClick={toggleView}>
                    I am a new user
                </button>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">
                        Log In
                    </button>
                    {error && <div style={{color: 'red', marginTop: '10px'}}>{error}</div>}
                </form>
            </div>
        );
    }
}