import React, { useState } from 'react';
import './welcome.css';

export default function Unauthenticated({ onLogin }) {
    const [isNewUser, setIsNewUser] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!name.trim()) return setError('Name is required');
        if (!username.trim()) return setError('Username is required');
        if (!password) return setError('Password is required');
        if (password !== confirmPassword) return setError('Passwords do not match');

        try {
            const response = await fetch('/api/auth/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, username, password, age: await getAge(name) }),
            });
            if (response.ok) {
                const data = await response.json();
                // Optional: store minimal current user info locally
                localStorage.setItem('currentUser', JSON.stringify(data));
                onLogin(data);
            } else {
                const errBody = await response.json().catch(() => ({}));
                setError(errBody.msg || 'Failed to create account');
            }
        } catch (err) {
            setError('Backend not reachable');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!username.trim()) return setError('Username required');
        if (!password) return setError('Password required');
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('currentUser', JSON.stringify(data));
                onLogin(data);
            } else {
                const errBody = await response.json().catch(() => ({}));
                setError(errBody.msg || 'Invalid username or password');
            }
        } catch (err) {
            setError('Backend not reachable');
        }
    };

    async function getAge(name) {
        try {
            const response = await fetch('https://api.agify.io?name=' + name);
            const data = await response.json();
            console.log('Predicted age data:', data);
            return data.age;
        } catch (error) {
            console.error('Error getting age:', error);
            return Math.floor(Math.random() * 30) + 15 + name.length;
        }
    }

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
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm-password">Confirm password:</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Create Account</button>
                    {error && <div className="error">{error}</div>}
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
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <button type="submit" className="btn btn-success" style={{ marginRight: '8px' }}>Log In</button>
                        <button type="button" className="btn btn-secondary" onClick={getAge}>
                            Test Age API
                        </button>
                    </div>
                    {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                </form>
            </div>
        );
    }
}
