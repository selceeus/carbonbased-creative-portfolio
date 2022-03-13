import React from 'react';
import { Link } from "react-router-dom";
import './header.styles.scss';

const Header = props => {

    return(
        <header className="nav-container">
            <nav>
                <ul>
                    <li>
                        <Link  to="/">Home</Link>
                    </li>
                    <li>
                        <Link  to="/about">About</Link>
                    </li>
                    <li>
                        <Link  to="/solutions">Solutions</Link>
                    </li>
                    <li>
                        <Link  to="/work">Work</Link>
                    </li>
                    <li>
                        <Link  to="/journal">Journal</Link>
                    </li>
                    <li>
                        <Link  to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
    
export default Header;