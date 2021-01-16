import '../css/BlogCard.css'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlogCard from './BlogCard'

class BlogContainer extends Component {
    
    

    render(){
        const { blogs } = this.props
        return (
        <div id="blog-container">
                {blogs.reverse().map(blog => <BlogCard key={blog.id} blog={blog} handleHomeRender={this.props.handleHomeRender}/>)}
        </div>
    );}
}

export default connect(state=>({blogs: state.user.blogs}))(BlogContainer);
