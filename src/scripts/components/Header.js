import React from 'react';
import NavBar from './NavBar';

const Header = ({ title = 'overreach', tagline = 'extend your reach' }) => (
    <div className="header">
        <NavBar />
        <h1 className="header__title">{title}</h1>
        <h2 className="header__tagline">{tagline}</h2>
    </div>
)

export default Header;
