import React from 'react';
import './navigation.scss'
import {Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Navigation() {
    return(
        <div>
            <Navbar expand onToggle='sm' bg='dark' variant='dark' sticky='top'>
                <Nav>
                    <Nav.Item>
                        <Nav.Link className='navLinkHome' as={Link} to={`/`} target='_self'>myFlix Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        {/* should be `/users/${user} */}
                        <Nav.Link className='navLink' as={Link} to={`/users/`} target='_self'>Profile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        {/* should also have onClick={this.onLoggedOut} */}
                        <Nav.Link className='navLink' as={Link} to={`/login`} target='_self'>Log Out</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </div>
    )

}

export default Navigation;


