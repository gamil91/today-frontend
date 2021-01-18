import React from 'react';
import { connect } from 'react-redux';

const Comment = ({ comment, userComment, editComment, deleteComment }) => {
    // debugger
    return (
        <div>
            <strong>{comment.comment} - {comment.name}</strong> {" "}{" "}{" "}
            {userComment  ? <u onClick={() => editComment(comment)}>edit</u> : null}{" "}
            {userComment ? <u onClick={() => deleteComment(comment.id)}>delete</u> : null}
            
        </div>
    );
}

export default Comment;
