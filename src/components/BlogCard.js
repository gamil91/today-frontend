import '../css/BlogCard.css'
import React, { Component } from 'react';
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux';
import { deleteBlog, likeBlog, unlikeBlog } from '../redux/actions/blogsActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import CommentForm from './CommentForm'


class BlogCard extends Component {

    

    render() {
        const { title, content, user, created_at, user_likes, id, user_id, comments, image} = this.props.blog
        // debugger
        // const handleLike = (e) => {
        //     debugger
        //     if (e.target.textContent === "LIKED" ){
        //         this.props.likeBlog(id) 
        //     } else {
        //         let blog = this.props.likedBlogs.find(b => b.id === id)
        //         let like = blog.likes.find(like => like.user_id === this.props.user.id)
        //         this.props.unlikeBlog(like.id)
        //         }
        //     }

        const handleLike = () => {
            this.props.likeBlog(id) 
        }

        const handleUnLike = () => {
            let blog = this.props.likedBlogs.find(b => b.id === id)
            let like = blog.likes.find(like => like.user_id === this.props.user.id)
            this.props.unlikeBlog(like.id)
        }
        
        return (
            <div id="blog-card">
                <Card className="mb-2 text-center card " key={5}
                    style={{ width: '50rem' }}>

                    <Card.Header as="h5">{title}</Card.Header>
                    <Card.Body>
                    {image ? <div className="pic-Div"><img src={image} alt="" /></div> : null}
                        
                        <blockquote className="blockquote mb-0">
                            <p>
                            {content}
                            </p>

                            <footer className="blockquote-footer">
                                {`${user.name} ${created_at}`}<br/>
                                {this.props.user.id === user_id && this.props.blog.private === true ?  "(private blog, only viewable by you)" : null}
                            </footer>
                        </blockquote>   
                        <br/>
                            <h5>{user_likes.length} {user_likes.length === 1? "like" : "likes"}</h5>
                        <br/>
                        {this.props.liked ? 
                        <><FontAwesomeIcon icon={faThumbsUp} size="2x" className="like-icon" onClick={handleUnLike}/></>:
                        <><FontAwesomeIcon icon={faThumbsUp} size="2x" onClick={handleLike}/></>}&nbsp;&nbsp;

                        {this.props.user.id === user_id ?  
                        <><FontAwesomeIcon icon={faPencilAlt} size="2x" onClick={() => this.props.handleHomeRender("Check in", id)}/></>: null}&nbsp;&nbsp;

                        {this.props.user.id === user_id ?  
                        <><FontAwesomeIcon icon={faTrashAlt} size="2x" onClick={()=> this.props.deleteBlog(id)}/></>: null} &nbsp;&nbsp;

                      

                        {/* <Button variant="secondary" onClick={handleLike}>{this.props.liked ? `UNLIKE` : `LIKE`}</Button>{" "}
                        
                        {this.props.user.id === user_id ?  
                        <Button variant="secondary" onClick={() => this.props.handleHomeRender("Check in", id)}>Edit</Button>: null} {" "}

                         {this.props.user.id === user_id ?  
                        <Button onClick={()=> this.props.deleteBlog(id)} variant="secondary">Delete</Button> : null}  */}

                    </Card.Body> 
                    
                    <CommentForm blog_id={id} comments={comments}/>

                    
                  
                </Card>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        likedBlogs: state.likedBlogs
    }
}
export default connect(mapStateToProps, {deleteBlog, likeBlog, unlikeBlog})(BlogCard);
// export default connect(state =>({user: state.user}), {deleteBlog, likeBlog, unlikeBlog})(BlogCard);
