// import logo from '../favicon.ico';
import React from 'react';
// import logo from '../public/logo192.png';
import { Component } from 'react';
// import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav } from 'react-bootstrap';

class Navigation extends Component {
    render() {
        return (
            <div>   
            <Navbar bg="dark" variant="dark" sticky="top" expand="md" collapseOnSelect>
                <Navbar.Brand>
                    {/* <img src={logo} width="50px" alt="logo"></img>  */}
                
                    </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link href="./Home">Home</Nav.Link> 
                       
                        <Nav.Link href="./Text">Solving Problems</Nav.Link>
                        <Nav.Link href="./Keywords">Keywords</Nav.Link>
                        <Nav.Link href="./Images">Text_to_Image</Nav.Link>
                      
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                    </div>
        );
    }
} 

export default Navigation;
