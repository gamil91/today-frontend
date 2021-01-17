import React, { Component } from 'react';
import { fetchUser } from '../redux/actions/userActions'
import { fetchBlogs, fetchLikedBlogs } from '../redux/actions/blogsActions'
import { connect } from 'react-redux';
import Form from './UserForm'
import BlogForm from './BlogForm'
import TopNav from './TopNav'
import BlogContainer from './BlogContainer'

class Home extends Component {

    componentDidMount(){
        this.props.fetchLikedBlogs()
        this.props.fetchUser()
        this.props.fetchBlogs()
    }

    state = {screen: ""}

    handleHomeRender = (name, id="") => {
        id === "" ? this.setState({screen: name}) : this.setState({screen: name, id})
    }

    filterUserBlogs = () => {
        return this.props.allBlogs.filter(b => b.user_id === this.props.user.id)
    }
    
    render() {
        console.log(this.props)
        this.filterUserBlogs()
        switch(this.state.screen) {
            case "Settings":
                return (
                <>
                    <TopNav handleHomeRender={this.handleHomeRender}/>
                    <Form name="Update your account" /> 
                </>)
            case "Check in":
                return (
                <>
                    <TopNav handleHomeRender={this.handleHomeRender} />
                    <BlogForm 
                        id={!!this.state.id ? this.state.id : null} 
                        handleHomeRender={this.handleHomeRender}/> 
                    
                </>)
            case "Blogs":
                return (
                    <>
                    <TopNav handleHomeRender={this.handleHomeRender} />
                    <BlogContainer 
                        blogs={this.props.allBlogs} 
                        likedBlogs={this.props.likedBlogs} 
                        handleHomeRender={this.handleHomeRender}/>
                     
                    </>)
            default :
                return (
                <>
                    <TopNav handleHomeRender={this.handleHomeRender}/>
                    <h1>Hi {this.props.user.name}!</h1>
                    <BlogContainer 
                        blogs={this.filterUserBlogs()} 
                        likedBlogs={this.props.likedBlogs} 
                        handleHomeRender={this.handleHomeRender}/>
                </>)
        }
    }
}

const mapStateToProps = state => {
    // debugger
    return {
        user: state.user,
        allBlogs: state.allBlogs,
        likedBlogs: state.likedBlogs
    }
}

export default connect(mapStateToProps, {fetchUser, fetchBlogs, fetchLikedBlogs})(Home);
