import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions'
import { withRouter } from 'react-router-dom'
import '../css/TopNav.css'

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
    <div id="top-nav"> 
        {/* <Navbar bg="dark" variant="dark"> */}
        <Navbar>
          <Nav className="mr-auto">
            <Nav.Link onClick={this.handleClick}>Check in</Nav.Link>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link onClick={this.handleClick} >Blogs</Nav.Link>
            <Nav.Link onClick={this.handleClick} >Liked Blogs</Nav.Link>
            <Nav.Link onClick={this.handleClick}>Settings</Nav.Link>
            <Nav.Link onClick={this.handleLogout}>Log Out</Nav.Link>
          </Nav>
        </Navbar>
    </div>
    );}
}

export default withRouter(connect(null, {logoutUser})(TopNav));
