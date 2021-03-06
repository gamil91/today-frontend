import '../css/BlogCard.css'
import React, { Component } from 'react';
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux';
import { deleteBlog, likeBlog, unlikeBlog } from '../redux/actions/blogsActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import CommentForm from './CommentForm'
import DeleteModal from './DeleteModal'

class BlogCard extends Component {

    state = {
        blog_id: this.props.blog.id,
        modalDelete: false,
        openDeleteModal: false
    }

    handleDelete = () => {
        this.closeModal()
        this.props.deleteBlog(this.state.blog_id)
    }
    
    openModal = () => {this.setState({ openDeleteModal: true, modalDelete: true})}
    closeModal = () => this.setState({ openDeleteModal: false });

    render() {
        const { title, content, user, created_at, user_likes, id, user_id, comments, image} = this.props.blog
   
        const handleLike = () => {
            this.props.likeBlog(id)}

        const handleUnLike = () => {
            let blog = this.props.likedBlogs.find(b => b.id === id)
            let like = blog.likes.find(like => like.user_id === this.props.user.id)
            this.props.unlikeBlog(like.id)}
        

        return (
            <div id="blog-card">
                <Card className="mb-2 text-center card " key={5}
                    style={{ width: '50rem' }}>

                    <Card.Header as="h5"><strong>{title}</strong></Card.Header>
                    <Card.Body>
                    <div id="pic-and-content">
                    {image ? <div className="pic-Div"><img src={image} alt="" /></div> : null}
                        
                        <blockquote className="content blockquote mb-0">
                            <p style={{padding: '10px'}} id="caption-test">
                            {content}
                            </p>
                            

                            <footer className="blockquote-footer" onClick={() => user.name === this.props.user.name ? this.props.handleHomeRender("") : this.props.handleOtherUserRender(user_id, user.name) }>
                                {`${user.name} ${created_at}`}<br/>
                                {this.props.user.id === user_id && this.props.blog.private === true ?  "(private blog, only viewable by you)" : null}
                            </footer>
                        </blockquote>   
                    </div>

                        <br/>
                            <h5>{user_likes.length} {user_likes.length === 1? "like" : "likes"}</h5>
                        <br/>

                        {this.props.liked ? 
                        <i ><FontAwesomeIcon icon={faThumbsUp} size="2x" className="like-icon" onClick={handleUnLike}/></i>:
                        <i><FontAwesomeIcon icon={faThumbsUp} size="2x" className="icon to-like-icon" onClick={handleLike}/></i>}&nbsp;&nbsp;


                        {this.props.user.id === user_id ?  
                        <i><FontAwesomeIcon icon={faPencilAlt} size="2x" className="icon to-edit-icon" onClick={() => this.props.handleHomeRender("Check in", id)}/></i>: null}&nbsp;&nbsp;


                        {this.props.user.id === user_id ?  
                        <i><FontAwesomeIcon icon={faTrashAlt} size="2x" className="icon to-delete-icon" onClick={this.openModal}/></i>: null} &nbsp;&nbsp;
                    </Card.Body>  
                    
                    <CommentForm blog_id={id} comments={comments} handleOtherUserRender={this.props.handleOtherUserRender} handleHomeRender={this.props.handleHomeRender}/>
                </Card>
                { this.state.modalDelete ?
            <DeleteModal
                deleteBlog={true}
                closeModal={this.closeModal}
                openModal={this.state.openDeleteModal}
                handleDelete={this.handleDelete}/> : null }
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

