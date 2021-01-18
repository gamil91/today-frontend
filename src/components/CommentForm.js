import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux';
import { addComment, updateComment, deleteComment } from '../redux/actions/commentsActions'
import CommentContainer from './CommentContainer'

class CommentForm extends Component {

    state = {
        comment: "",
        comment_id: "",
        blog_id: this.props.blog_id,
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
            this.setState({comment: "", blog_id: "", comment_id: ""})
        }
        else {
            this.props.addComment(this.state)
            this.setState({comment: "", blog_id: ""})
        }
    }


    editComment = (comment) => {
        this.setState({comment: comment.comment , comment_id: comment.id})
    }

    render() {
        
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control name="comment" as="textarea" rows={3} onChange={this.handleChange} 
                        value={this.state.comment}/>
                    </Form.Group>
                    <Button type="submit" variant="primary">Comment</Button>
                </Form>
                <br/>

                {!!this.props.comments.length ? <CommentContainer deleteComment={deleteComment} editComment={this.editComment} comments={this.props.comments}/> : null}
            </div>
        );
    }
}

export default connect(null, { addComment, updateComment, deleteComment })(CommentForm);
