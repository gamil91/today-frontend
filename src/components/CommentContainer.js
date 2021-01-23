import React from 'react';
import { connect } from 'react-redux';
import Comment from './Comment'
import '../css/Comments.css'

const CommentContainer = ({comments, editComment, user, deleteComment}) => {
    // debugger
    return (
        
    <div id="comment-container">
        <br/>
        <h3 id="comments-section">Comments : </h3>
        <ul className="comments-li">
            {comments.map(c => <li key={c.id}><Comment deleteComment={deleteComment} editComment={editComment}userComment={c.user_id === user.id} key={c.id} comment={c}/></li>)}
        </ul>
    </div>
    );
}

export default connect(state => ({user:state.user}))(CommentContainer);
