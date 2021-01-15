import React, { Component } from 'react';
import { fetchUser } from '../redux/actions'
import { connect } from 'react-redux';
import Form from './UserForm'
import BlogForm from './BlogForm'
import TopNav from './TopNav'

class Home extends Component {

    componentDidMount(){
        this.props.fetchUser()
    }

    state = {screen: ""}

    handleHomeRender = (name) => {
        // debugger
        this.setState({screen: name})
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
                <TopNav handleHomeRender={this.handleHomeRender}/>
                <BlogForm /> 
            </>)
            default :
                return (
                <>
                    <TopNav handleHomeRender={this.handleHomeRender}/>
                    <h1>Hi {this.props.user.name}!</h1>
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
