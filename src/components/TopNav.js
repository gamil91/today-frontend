import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";

class TopNav extends Component {

  handleLogout = () => {
    this.props.logoutUser()
    this.props.history.push("/login")
  }

  handleClick = (e) => {
    this.props.handleHomeRender(e.target.textContent)
  }

  render(){
      return (
        <header>
        <div className="top-nav-wrapper"> 
      
        <i className="bars-icon" ><FontAwesomeIcon icon={faBars} size="2x" className="icon " /></i>
        <Navbar>
          <Nav classname="nav">
            <Nav.Link onClick={this.handleClick}>Check in</Nav.Link>
            <Nav.Link onClick={this.handleClick}>Home</Nav.Link>
            <NavDropdown title="Blogs" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={this.handleClick} >All Blogs</NavDropdown.Item>
            <NavDropdown.Item onClick={this.handleClick}>Liked Blogs</NavDropdown.Item>
            </NavDropdown>

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
