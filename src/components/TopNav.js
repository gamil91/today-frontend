import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions'
import { withRouter } from 'react-router-dom'
// import '../css/TopNav.css'

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
            <Nav.Link onClick={this.handleClick} >Blogs</Nav.Link>
            <Nav.Link onClick={this.handleClick} >Liked Blogs</Nav.Link>
            <Nav.Link onClick={this.handleClick}>To-do</Nav.Link>
            <Nav.Link onClick={this.handleClick}>Settings</Nav.Link>
            <Nav.Link onClick={this.handleLogout}>Log Out</Nav.Link>
          </Nav>
        </Navbar>
    </div>
    </header>
    );}
}

export default withRouter(connect(null, {logoutUser})(TopNav));
