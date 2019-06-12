import React from 'react';

class Header extends React.Component {

    render () {
        return (
            <div className="ui large menu">
                <div className="header item">
                    Recipes
                </div>
                <div className="right menu">
                    <button className="ui primary button">Login</button>
                    <button className="ui primary button">Sign Up</button>
                </div>
            </div>
        );
    }

}

export default Header;