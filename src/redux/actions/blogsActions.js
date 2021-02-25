

export function addBlogState(data){
    return {type: "ADD_BLOG", payload: data}
}


export function updateBlogState(data){
    return {type:"UPDATE_BLOG", payload: data}
}

export function deleteBlog(id){
    return (dispatch) => {
        fetch(`https://today-api.herokuapp.com/blogs/${id}`, {
        method:  "DELETE",
        headers: {"Content-Type": "application/json"}})
        .then(res => res.json())
        .then(data => dispatch({type:"DELETE_BLOG", payload:data.id}))
    }
}

export function likeBlog(blog_id){
    // debugger
    return (dispatch) => {
        let config = {
            method:  "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`},
            body: JSON.stringify({blog_id})
          }       
        fetch(`https://today-api.herokuapp.com/likes`, config)
        .then(res => res.json())
        .then(data =>dispatch(addLike(data))) 
    }
}

function addLike(data){
    return {type:'ADD_LIKE', payload: {blog:data.blog, user:data.user}}
}

export function unlikeBlog(id){
    // debugger
    return (dispatch) => {
        fetch(`https://today-api.herokuapp.com/likes/${id}`, {
        method:  "DELETE",
        headers: {"Content-Type": "application/json"}})
        .then(res => res.json())
        .then(data => dispatch(removeLike(data)))
    }
}

function removeLike(data){
    return {type: 'UNLIKE_BLOG', payload: {blog:data.blog, user:data.user}}
}

export function fetchBlogs(){
    return (dispatch) => {
        fetch(`https://today-api.herokuapp.com/blogs`)
        .then(res => res.json())
        .then(data => {
            // debugger
            dispatch(setBlogs(data))}) 
    }
}

function setBlogs(data){
    return {type:"SET_BLOGS", payload: data}
}

export function fetchLikedBlogs(){
    return (dispatch) => {
        fetch('https://today-api.herokuapp.com/getlikedblogs', {
            method: 'GET',
            headers: {
                "Content-Type" : "application/json",
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            }})
            .then(res => res.json())
            .then(data => dispatch({type: 'SET_LIKED_BLOGS', payload: data}))
    }
}