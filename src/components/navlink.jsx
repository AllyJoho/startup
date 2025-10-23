import React from 'react';

import '../app.css';
import { NavLink } from 'react-router-dom';

export function NavigateLink({ title, children }) {
    const to = title && title.length ? `/${title}` : '/';
    return (
        <li className="nav-item">
            <NavLink className="nav-link" to={to}>
                {children}
            </NavLink>
        </li>
    );
}

// export function NavigateLink() {
//     return (
//         <div>Hi</div>
//     );
// }
