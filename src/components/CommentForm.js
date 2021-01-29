import "../css/Comments.css"

import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux';
import { addComment, updateComment, deleteComment } from '../redux/actions/commentsActions'
import CommentContainer from './CommentContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class CommentForm extends Component {

    state = {
        comment: "",
        comment_id: "",
        blog_id: this.props.blog_id,
        showCommentForm: false,
    }
    

    handleChange = (e) => {
        this.setState({comment: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.comment === ""){
            alert("Comment field cannot be blank")
        } if (this.state.comment_id !== ""){
            this.props.updateComment(this.state)
            this.setState({comment: "", blog_id: "", comment_id: "", showCommentForm: false})
        }
        else {
            this.props.addComment(this.state)
            this.setState({comment: "", showCommentForm: false})
        }
    }


    editComment = (comment) => {
        this.setState({comment: comment.comment , comment_id: comment.id, showCommentForm: true})
    }

    render() {
        
        return (
            <div>
                {!!this.props.comments.length ? <CommentContainer deleteComment={this.props.deleteComment} editComment={this.editComment} comments={this.props.comments}/> : null}
                {this.state.showCommentForm ? <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="comment-form">
                    <Form.Control className="comment-field" name="comment" as="textarea" rows={3} onChange={this.handleChange} 
                        value={this.state.comment}/>
                    </Form.Group>
                    <Button id="comment-btn" type="submit" >Comment</Button>
                </Form> : 
                    <div id="add-a-comment" onClick={() => this.setState({showCommentForm: true})}> 
                <i ><FontAwesomeIcon icon={faPlus} size="1x" className="add-comment-icon" /></i>{" "}Add a comment</div>}
                <br/>
                <br/>
            </div>
        );
    }
}

export default connect(null, { addComment, updateComment, deleteComment })(CommentForm);
