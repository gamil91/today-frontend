import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions'
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
    <div> 
      <ul id="nav">
        <Navbar bg="dark" variant="dark">
          {/* <li><Nav.Link onClick={this.handleClick}>Check in</Nav.Link></li> */}
          <Nav className="mr-auto">
            <li><Nav.Link onClick={this.handleClick}>Check in</Nav.Link></li>
            <li><Nav.Link href="/home">Home</Nav.Link></li>
            <li><Nav.Link href="/blogs" >Blogs</Nav.Link></li>
            <li><Nav.Link onClick={this.handleClick}>Settings</Nav.Link></li>
            <li><Nav.Link onClick={this.handleLogout}>Log Out</Nav.Link></li>
          </Nav>
        </Navbar>
      </ul>
    </div>
    );}
}

export default withRouter(connect(null, {logoutUser})(TopNav));
