import React, { Component } from 'react';
import { fetchUser } from '../redux/actions/userActions'
import { connect } from 'react-redux';
import Form from './UserForm'
import BlogForm from './BlogForm'
import TopNav from './TopNav'
import BlogContainer from './BlogContainer'

class Home extends Component {

    componentDidMount(){
        this.props.fetchUser()
    }

    state = {screen: ""}

    handleHomeRender = (name, id="") => {
        if(id === ""){
            this.setState({screen: name})
        } else {
            this.setState({screen: name, id})
        }
    }
    
    render() {
        console.log(this.props)

        switch(this.state.screen) {
            case ("Settings"):
                return (
                <>
                    <TopNav handleHomeRender={this.handleHomeRender}/>
                    <Form name="Update your account" /> 
                </>)
            case ("Check in"):
            return (
                <>
                    <TopNav handleHomeRender={this.handleHomeRender} />
                    <BlogForm id={!!this.state.id ? this.state.id : null} handleHomeRender={this.handleHomeRender}/> 
                    
                </>)
            default :
                return (
                <>
                    <TopNav handleHomeRender={this.handleHomeRender}/>
                    <h1>Hi {this.props.user.name}!</h1>
                    <BlogContainer handleHomeRender={this.handleHomeRender}/>
                </>)
        }
    }
}

const mapStateToProps = state => {
    // debugger
    return {
        user: state.user,
        allBlogs: state.allBlogs
    }
}

export default connect(mapStateToProps, {fetchUser})(Home);
