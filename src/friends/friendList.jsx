import React from 'react';
import './friends.css';

export function FriendListView(props) {
    return (
        <div>
            <p>
                You have no friends yet. Start by adding some! If it's not working, please make sure
                you're logged in.
            </p>
            <p>OR</p>
            <p>You have __ friends. Add some more here!</p>
            <ul class="friends">
                <li>!!! Friend information will be here with DB data implementation.</li>
                <li>Friends listed will be in a bullet point like this.</li>
                <li>Todd</li>
            </ul>
        </div>
    );
}
