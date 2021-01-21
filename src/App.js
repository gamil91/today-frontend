import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import Home from './components/Home';
import Form from './components/UserForm'
import NotFound from './components/NotFound'


class App extends Component {

 

  handleRender = (routerProps) => {
    switch (routerProps.location.pathname) {
      case "/login" :
        return <body><Form screen="Log in"/></body>
      case "/signup" :
        return <body><Form screen="Sign up"/></body>
      case "/home" :
        return <Home />
      default:
        break
    }
  }
  
 

  render(){
    // console.log(this.state.newUser)
   
    return (
      <div className="App">
     
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
      
      </div>
    );
  }
}
export default withRouter(connect(state => ({user:state.user}))(App));
