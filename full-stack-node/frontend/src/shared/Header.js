import React from 'react';
import './style/Header.css';
import image from '../assets/images/logo.jpeg'
import { Link } from 'react-router-dom';
const Header =() => {
    return(
        <header className='main-header'>
            <div className='logo'>
                <img src={image} alt='logo' />
            </div>
            <nav>
                <ul>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/login'}>Login</Link></li>
                    <li><Link to={'/about'}>About</Link></li>
                    <li><Link to={'/cart'}>Cart</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;