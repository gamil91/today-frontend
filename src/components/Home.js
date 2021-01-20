import React, { Component } from 'react';
import { fetchUser } from '../redux/actions/userActions'
import { fetchBlogs, fetchLikedBlogs } from '../redux/actions/blogsActions'
import { connect } from 'react-redux';
import Form from './UserForm'
import BlogForm from './BlogForm'
import TopNav from './TopNav'
import BlogContainer from './BlogContainer'
import '../App.css'

class Home extends Component {

    componentDidMount(){
        this.props.fetchLikedBlogs()
        this.props.fetchUser()
        this.props.fetchBlogs()
    }

    state = {screen: ""}

    handleHomeRender = (name, blogID="") => {
        blogID === "" ? this.setState({screen: name}) : this.setState({screen: name, blogID})
    }

    filterUserBlogs = () => {
        return this.props.allBlogs.filter(b => b.user_id === this.props.user.id)
    }

    filterPublicBlogs = () => {
        return this.props.allBlogs.filter(b => b.private === false || b.user_id === this.props.user.id)
    }

    filterLikedBlogs = () => {
        let likedIds = this.props.likedBlogs.map(b => b.id)
        return this.props.allBlogs.filter(b => likedIds.includes(b.id))
    }
    
    render() {
        console.log(this.props)
        // debugger
        switch(this.state.screen) {
            case "Settings":
                return (
                <>
                    <TopNav handleHomeRender={this.handleHomeRender}/>
                        <div className="banner-area">
                        <h2>Today.</h2>
                        </div>
                        <div className="content-area">
			            <div className="wrapper">
                            <Form screen="Update your account" /> 
                        </div>
                        </div>
                </>)
            case "Check in":
                return (
                <>
                    <TopNav handleHomeRender={this.handleHomeRender}/>
                        <div className="banner-area">
                        <h2>Today.</h2>
                        </div>
                        <div className="content-area">
			            <div className="wrapper">
                    <BlogForm 
                        blogID={!!this.state.blogID ? this.state.blogID : null} 
                        handleHomeRender={this.handleHomeRender}/> 
                    </div>
                        </div>
                </>)
            case "Blogs":
                return (
                    <>
                    <TopNav handleHomeRender={this.handleHomeRender}/>
                        <div className="banner-area">
                        <h2>Today.</h2>
                        </div>
                        <div className="content-area">
			            <div className="wrapper">
                    <BlogContainer 
                        blogs={this.filterPublicBlogs()} 
                        likedBlogs={this.props.likedBlogs} 
                        handleHomeRender={this.handleHomeRender}/>
                        </div>
                        </div>
                    </>)
            case "Liked Blogs":
                return (
                    <>
                    <TopNav handleHomeRender={this.handleHomeRender}/>
                        <div className="banner-area">
                        <h2>Today.</h2>
                        </div>
                        <div className="content-area">
			            <div className="wrapper">
                    <BlogContainer 
                        blogs={this.filterLikedBlogs()} 
                        likedBlogs={this.props.likedBlogs} 
                        handleHomeRender={this.handleHomeRender}/>
                        </div>
                        </div>
                    </>)
            default :
                return (
                <>
                    <TopNav handleHomeRender={this.handleHomeRender}/>
                        <div className="banner-area">
                        <h2>Today.</h2>
                        </div>
                        <div className="content-area">
			            <div className="wrapper">
                    <h1>Hi {this.props.user.name}!</h1>
                    <BlogContainer 
                        blogs={this.filterUserBlogs()} 
                        likedBlogs={this.props.likedBlogs} 
                        handleHomeRender={this.handleHomeRender}/>
                        </div>
                        </div>
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
