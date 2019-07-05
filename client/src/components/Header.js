import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Button, Menu, Icon } from 'semantic-ui-react';

class Header extends React.Component {

    //Helper method to render the header when a user is not logged in
    renderDefault() {
        return (
            <>
            <Menu.Item>
                <Button primary as={Link} to="/login">Login</Button>
            </Menu.Item>
            <Menu.Item>
                <Button primary as={Link} to="/signup">Sign Up</Button>
            </Menu.Item>
            </>
        );
    }

    //Helper method to render the header when a user is logged in
    renderLoggedIn() {
        return(
            <>
            <Menu.Item>
                <Button primary as={Link} to="/recipes">Recipes</Button>
            </Menu.Item>
            <Menu.Item>
                <Button primary as={Link} to="/ingredients">Ingredients</Button>
            </Menu.Item>
            <Menu.Item>
                <Dropdown icon={<Icon name="user circle" color="blue" size="large" />}>
                    <Dropdown.Menu>
                    <Dropdown.Item text='My Profile' as={Link} to="/profile" />
                    <Dropdown.Item text='My Friends' as={Link} to="/friends" />
                    <Dropdown.Divider />
                    <Dropdown.Item text='Logout' as={Link} to="/" />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
            </>
        );
    }

    render () {
        return (
            <Menu>
                <Menu.Item header as={Link} to="/">
                    Recipes
                </Menu.Item>
                <Menu.Menu position='right'>
                    {this.renderLoggedIn()}
                </Menu.Menu>
            </Menu>
        );
    }

}

export default Header;