import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
// import { connect } from 'react-redux';

import Home from './components/Home';
import Form from './components/UserForm'

import NotFound from './components/NotFound'
import SoundCloud from './components/SoundCloud';




class App extends Component {

  state = { openPlayer: false}

  handlePlayer = () => {
    this.setState(prevState => {
      return {openPlayer: !prevState.openPlayer}
    })
  }

  handleClose = () => {
    // console.log("this hit")
    this.setState({openPlayer: false})
  }

  handleRender = (routerProps) => {
    switch (routerProps.location.pathname) {
      case "/login" :
        return <div className="body"><Form screen="Log in"/></div>
      case "/signup" :
        return <div className="body"><Form screen="Sign up"/></div>
      case "/home" :
        return <div className="App"><Home handlePlayer={this.handlePlayer}/></div>
      default:
        break
    }
  }


  render(){
    // console.log(this.state.openPlayer)
   
    return (
      <div >
       
        <div id="container">
          <Switch className="App">

            <Route exact path="/" >
              {!!localStorage.getItem('jwt') ? <Redirect to="/home" /> : 
              <Redirect to="/login" exact component={this.handleRender} />}
            </Route>

            <Route exact path="/signup" >
              {!!localStorage.getItem('jwt') ? <Redirect to="/home" /> : 
              <Route path="/signup" exact component={this.handleRender} />}
            </Route>

            <Route exact path="/login">
            {!!localStorage.getItem('jwt') ? <Redirect to="/home" /> : 
             <Route path="/login" exact component={this.handleRender} />}
             </Route>

            <Route exact path="/home" >
            {!!localStorage.getItem('jwt') ? 
            <Route path="/home" exact component={this.handleRender} /> : 
            <Redirect to="/login"/>}
            </Route>

            <Route component={NotFound}/>
            

          </Switch>
        

        </div>
        {this.state.openPlayer === true ? 
          <SoundCloud handleClose={this.handleClose}/>
        : null}
      </div>
    );
  }
}

export default withRouter(App);
