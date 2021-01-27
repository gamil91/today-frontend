import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions'
import { withRouter } from 'react-router-dom'
// import '../css/TopNav.css'

import SoundCloud from './SoundCloud'

class TopNav extends Component {

  handleLogout = () => {
    this.props.logoutUser()
    this.props.history.push("/login")
  }

  handleClick = (e) => {
    // debugger
    this.props.handleHomeRender(e.target.textContent)
  }

  render(){
      return (
        <header>
    <div className="wrapper"> 
      
    
        <Navbar>
          <Nav >
            <Nav.Link onClick={this.handleClick}>Home</Nav.Link>
            <Nav.Link onClick={this.handleClick}>Check in</Nav.Link>
            <NavDropdown title="Blogs" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={this.handleClick} >All Blogs</NavDropdown.Item>
            <NavDropdown.Item onClick={this.handleClick}>Liked Blogs</NavDropdown.Item>
            </NavDropdown>

            {/* <Nav.Link onClick={this.handleClick} >Blogs</Nav.Link>
            <Nav.Link onClick={this.handleClick} >Liked Blogs</Nav.Link> */}
            <Nav.Link onClick={this.handleClick}>To-do</Nav.Link>
            <Nav.Link onClick={this.props.handlePlayer}>Tunes</Nav.Link>
            <Nav.Link onClick={this.handleClick}>Settings</Nav.Link>
            <Nav.Link onClick={this.handleLogout}>Log Out</Nav.Link>
          </Nav>
        </Navbar>

    </div>
    </header>
    );}
}

export default withRouter(connect(null, {logoutUser})(TopNav));
