import '../css/BlogCard.css'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlogCard from './BlogCard'

class BlogContainer extends Component {
    


    render(){
        const { blogs } = this.props
        let likedIds = this.props.likedBlogs.map(b => b.id)
        // debugger
        return (
        <div id="blog-container">
            {blogs.reverse().map(blog => 
                <BlogCard 
                    key={blog.id} blog={blog} 
                    liked={likedIds.includes(blog.id)} 
                    handleHomeRender={this.props.handleHomeRender}/>)}
        </div>
    );}
}

export default connect()(BlogContainer);
