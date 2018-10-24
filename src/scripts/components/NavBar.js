import React from 'react';
import {NavLink} from 'react-router-dom';

const NavBar = () => (
    <div className="navbar">
        <NavLink className="navbar__link" to="/" activeClassName="is-active" exact><h3>home</h3></NavLink>
        <NavLink className="navbar__link" to="/about" activeClassName="is-active" exact><h3>about</h3></NavLink>
    </div>
);

export default NavBar;
