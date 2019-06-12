import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {

    render () {
        return (
            <div className="ui large menu">
                <Link to="/" className="header item">
                    Recipes
                </Link>
                <div className="right menu">
                    <Link to="/login" className="ui primary button">Login</Link>
                    <Link to="/signup" className="ui primary button">Sign Up</Link>
                </div>
            </div>
        );
    }

}

export default Header;