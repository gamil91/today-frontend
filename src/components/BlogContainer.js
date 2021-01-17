import '../css/BlogCard.css'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlogCard from './BlogCard'

class BlogContainer extends Component {
    

    render(){
        const { blogs } = this.props
        let likedBlogIds = this.props.likedBlogs.map(b => b.id)
       
        return (
        <div id="blog-container">
            {blogs.map(blog => 
                <BlogCard 
                    key={blog.id} blog={blog} 
                    liked={likedBlogIds.includes(blog.id)} 
                    handleHomeRender={this.props.handleHomeRender}/>)}
        </div>
    );}
}

export default connect()(BlogContainer);
