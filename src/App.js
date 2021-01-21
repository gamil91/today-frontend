import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import Home from './components/Home';
import Form from './components/UserForm'
import NotFound from './components/NotFound'


class App extends Component {

  state = {newUser : false}

  handleRender = (routerProps) => {
    switch (routerProps.location.pathname) {
      case "/login" :
        return <Form screen="Log in"/>
      case "/signup" :
        return <Form screen="Sign up" newUser={this.handleNewUser}/>
      case "/home" :
        return <Home newUser={this.state.newUser}/>
      default:
        break
    }
  }
  
  handleNewUser = () => { this.setState({newUser: true})}

  render(){
    console.log(this.state.newUser)
   
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
