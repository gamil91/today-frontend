import '../css/BlogCard.css'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlogCard from './BlogCard'
import { Form, FormControl } from 'react-bootstrap'



class BlogContainer extends Component {
    
    state = {search: ""}

    render(){
        const { blogs } = this.props
        let likedBlogIds = this.props.likedBlogs.map(b => b.id)
       
        return (
        <div id="blog-container">

           {blogs.length === 0 ? null :  
           <Form inline id="search-bar" >
                <FormControl type="text" 
                            placeholder="Search" 
                            // className="mr-sm-2" 
                            onChange={(e) => {this.setState({search: e.target.value})}} />
            </Form>}

            {blogs.filter(blog => {
                if (this.state.search === ""){
                    return blog
                } else if (blog.title.toLowerCase().startsWith(this.state.search.toLowerCase())){
                    return blog
                } else if (blog.content.toLowerCase().includes(this.state.search.toLowerCase())){
                    return blog
                } else { return}
            }).map(blog => 
                <BlogCard 
                    handleOtherUserRender={this.props.handleOtherUserRender}
                    key={blog.id} blog={blog} 
                    liked={likedBlogIds.includes(blog.id)} 
                    handleHomeRender={this.props.handleHomeRender}/>)}
        </div>
    );}
}

export default connect()(BlogContainer);
