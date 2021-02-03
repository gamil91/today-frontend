import React from 'react';

const Comment = ({ comment, userComment, editComment, deleteComment, handleOtherUserRender, handleHomeRender }) => {
    
    return (
        <div id="comment-bubble">
            <strong>{comment.comment} - 
                <span style={{cursor: "pointer"}} 
                        onClick={() => userComment ? handleHomeRender("") : handleOtherUserRender(comment.user_id, comment.name) }>
                    {comment.name}</span>
            </strong> {" "}{" "}{" "}
            {userComment  ? <u style={{cursor: "pointer"}} onClick={() => editComment(comment)}>edit</u> : null}{" "}
            {userComment ? <u style={{cursor: "pointer"}} onClick={() => deleteComment(comment.id)}>delete</u> : null}
            
        </div>
    );
}

export default Comment;
