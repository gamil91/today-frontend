import { setUser } from './userActions'

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
        .then(data => dispatch(setUser(data.user)))
        
    }
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