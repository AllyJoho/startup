import React from 'react';
import { Authenticated } from './authenticated';
import Unauthenticated from './unauthenticated';

export function Welcome({ currentUser, onLogin, onLogout }) {
  return (
    <main className="views">
      {currentUser ? (
        <Authenticated currentUser={currentUser} onLogout={onLogout} />
      ) : (
        <Unauthenticated onLogin={onLogin} />
      )}
    </main>
  );
}

        // <div id="new-user">
        //     <h1>Hello New User!</h1>
        //     <p>You don't have an account yet. Please enter your details below to create one.</p>
        //     <button className="btn btn-primary">I have an account</button>
        //     <form method="get" action="friends.html">
        //         <div>
        //             <label for="name">Name:</label>
        //             <input type="text" id="name" name="name"/>
        //         </div>
        //         {/* <!-- When javascript and stuff is in effect there will be a checker that the username is available and
        //         8-12 characters without whitespace. This will be used for future login and connecting with friends --> */}
        //         <div>
        //             <label for="username">Username:</label>
        //             <input type="text" id="username" name="username"/>
        //         </div>
        //         {/* <!-- Will also make sure the password is at least 8 characters and has at least 1 number --> */}
        //         <div>
        //             <label for="password">Password:</label>
        //             <input type="password" id="password" name="password"/>
        //         </div>
        //         {/* <!-- Will make sure the confirm password matches the original password --> */}
        //         <div>
        //             <label for="confirm-password">Confirm password:</label>
        //             <input type="password" id="confirm-password" name="confirm-password"/>
        //         </div>
        //         {/* <!-- Create Account button -->
        //         <!-- Red because it's not valid yet --> */}
        //         <button type="submit" className="btn btn-danger" disabled>Create Account</button>
        //     </form>
        // </div>
        // <hr />
        // {/* <!-- Returning User view --> */}
        // <div id="returning-user">
        //     <h1>Welcome Back!</h1>
        //     <p>Please enter your username and password to log in.</p>
        //     <button className="btn btn-primary">I am a new user</button>
        //     <form method="get" action="friends.html">
        //         <div>
        //             <label for="username">Username:</label>
        //             <input type="text" id="username" name="username"/>
        //         </div>
        //         <div>
        //             <label for="password">Password:</label>
        //             <input type="password" id="password" name="password"/>
        //         </div>
        //         <button type="submit" className="btn btn-success" disabled>Log In</button>
        //     </form>
        // </div>