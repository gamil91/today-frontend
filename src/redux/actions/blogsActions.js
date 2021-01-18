

export function addBlogState(data){
    return {type: "ADD_BLOG", payload: data}
}

export function updateBlog(blog){
    return (dispatch) => {
        const { title, content, id } = blog
        let info = { title, content, private: blog.private}

        let config = {
            method:  "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`},
            body: JSON.stringify(info)
          }

        fetch(`http://localhost:3000/blogs/${id}`, config)
        .then(res => res.json())
        .then(data => {
            alert("Blog Succesfully Updated!")
            dispatch(updateBlogState(data))
        })
    }
}

function updateBlogState(data){
    return {type:"UPDATE_BLOG", payload: data}
}

export function deleteBlog(id){
    return (dispatch) => {
        fetch(`http://localhost:3000/blogs/${id}`, {
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
        fetch(`http://localhost:3000/likes`, config)
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
        fetch(`http://localhost:3000/likes/${id}`, {
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
        fetch(`http://localhost:3000/blogs`)
        .then(res => res.json())
        .then(data => {dispatch(setBlogs(data))}) 
    }
}

function setBlogs(data){
    return {type:"SET_BLOGS", payload: data}
}

export function fetchLikedBlogs(){
    return (dispatch) => {
        fetch('http://localhost:3000/getlikedblogs', {
            method: 'GET',
            headers: {
                "Content-Type" : "application/json",
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            }})
            .then(res => res.json())
            .then(data => dispatch({type: 'SET_LIKED_BLOGS', payload: data}))
    }
}