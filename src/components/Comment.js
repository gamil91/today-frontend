import React from 'react';


const Comment = ({ comment, userComment, editComment, deleteComment }) => {
    // debugger
    return (
        <div>
            <strong>{comment.comment} - {comment.name}</strong> {" "}{" "}{" "}
            {userComment  ? <u style={{cursor: "pointer"}} onClick={() => editComment(comment)}>edit</u> : null}{" "}
            {userComment ? <u style={{cursor: "pointer"}} onClick={() => deleteComment(comment.id)}>delete</u> : null}
            
        </div>
    );
}

export default Comment;
