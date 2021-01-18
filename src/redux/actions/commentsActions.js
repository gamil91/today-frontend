

export function addComment(data){
    
 return (dispatch) => {
     let info = {
         comment: data.comment,
         blog_id: data.blog_id
     }

     let config = {
        method:  "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization' : `Bearer ${localStorage.getItem('jwt')}`},
        body: JSON.stringify(info)
      }

      fetch(`http://localhost:3000/comments`, config)
        .then(res => res.json())
        .then(data => {
            dispatch(addCommentToState(data))
        })
    }
}

function addCommentToState(data){
    return {type:"ADD_COMMENT", payload: data}
}

export function updateComment(data){
    
    return (dispatch) => {
       
        let info = {
            comment: data.comment
        }
   
        let config = {
           method:  "PATCH",
           headers: {
               "Content-Type": "application/json",
               'Authorization' : `Bearer ${localStorage.getItem('jwt')}`},
           body: JSON.stringify(info)
         }
   
         fetch(`http://localhost:3000/comments/${data.comment_id}`, config)
           .then(res => res.json())
           .then(data => {
               dispatch(updateCommentInState(data))
        })
    }
}

function updateCommentInState(data){
    return {type: "UPDATE_COMMENT", payload: data}
}

export function deleteComment(id){
   
    return (dispatch) => {
        fetch(`http://localhost:3000/comments/${id}`, {
        method:  "DELETE",
        headers: {"Content-Type": "application/json"}})
        .then(res => res.json())
        .then(data => { 
            // debugger
            dispatch(deleteCommentInState(data))
        })
    }
}

function deleteCommentInState(data){
    return {type:"DELETE_COMMENT", payload:data}
}