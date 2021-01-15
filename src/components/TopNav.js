import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'

const TopNav = () => {
    return (
    <> 
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/myblogs" >My Blogs</Nav.Link>
          <Nav.Link href="/blogs" >Blogs</Nav.Link>
          <Navbar.Collapse className='justify-content-end'>
            <Nav.Item >
              <Nav.Link href="/editprofile">Settings</Nav.Link>
            </Nav.Item >
            <Nav.Item >
              <Nav.Link href="/blogs">Log Out</Nav.Link>
            </Nav.Item >
          </Navbar.Collapse>
        </Nav>
      </Navbar>
    </>
    );
}

export default TopNav;
