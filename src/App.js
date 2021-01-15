import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import Home from './components/Home';
import Form from './components/UserForm'


class App extends Component {


  handleRender = (routerProps) => {
    switch (routerProps.location.pathname) {
      case "/signup" :
        return <Form/>
      case "/home" :
        return <Home/>
      case "/editprofile" :
        return <Home edit={true} />
      default:
        break
    }
  }

  
  render(){
    console.log(this.props.user)
    return (
      <div className="App">
        <h1>Today. </h1>
        
          <Switch className="App">
            <Route path="/signup" exact component={this.handleRender} />
            <Route path="/home" exact component={this.handleRender} />
            <Route path="/editprofile" exact component={this.handleRender} />
          </Switch>
        

      </div>
    );
  }
}
export default withRouter(connect(state => ({user:state.user}))(App));
