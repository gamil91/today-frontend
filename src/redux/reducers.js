import { combineReducers } from 'redux';

const initialState = {
    user: {name: "", id: ""},
    allBlogs: [],
    likedBlogs: []
}

const userReducer = (state = initialState.user, action) => {
    switch(action.type){
        case "SET_USER":
            return {name: action.payload.name, id: action.payload.id}
        case "LOG_OUT":
            return initialState.user
        default:
            return state
    }
}

const likesReducer = (state = initialState.likedBlogs, action) => {
    switch(action.type){
        case "SET_LIKED_BLOGS":
            let blogsLiked = action.payload.map(data => Object.assign(data.blog))
            return blogsLiked
        case "UNLIKE_BLOG":
            let filteredLikes = state.filter(likedBlog => likedBlog.id !== action.payload.blog.id) 
            return filteredLikes
        case "ADD_LIKE":
            return [...state, action.payload.blog]
        default:
            return state
    }
}

const blogsReducer = (state = initialState.allBlogs, action) => {
    switch(action.type){
        case "SET_BLOGS":
            return action.payload.reverse()
        case "ADD_BLOG":
            return [...state, action.payload]

        case "ADD_LIKE":
            let findBlog = state.find(b => b.id === action.payload.blog.id)
            let index = state.map(x => x.id).indexOf(action.payload.blog.id)
            let likedBlog = {...findBlog, user_likes:[...findBlog.user_likes, action.payload.user]}

            let begin = state.slice(0, index)
            let ending = state.slice(index + 1)
            // let blogs = state.filter(b => b.id !== action.payload.blog.id)
            return [...begin, likedBlog, ...ending]


        case "UNLIKE_BLOG":
            let toUnlike = state.find(b => b.id === action.payload.blog.id)
            let idx = state.map(x => x.id).indexOf(action.payload.blog.id)
            let userLikes = toUnlike.user_likes.filter(ul => ul.id !== action.payload.user.id)
            let updatedBlog = {...toUnlike, user_likes: userLikes}

            let first = state.slice(0, idx)
            let end = state.slice(idx+1)
            // let otherblogs = state.filter(b => b.id !== action.payload.blog.id)
            return [...first, updatedBlog, ...end]

        case "UPDATE_BLOG":
            let filter = state.filter(b => b.id !== action.payload.id)
            return [...filter, action.payload]
        case "DELETE_BLOG":
            let updated = state.filter(b => b.id !== action.payload)
            return updated
        default:
            return state
    }
}



export default combineReducers({
    user: userReducer,
    likedBlogs: likesReducer,
    allBlogs: blogsReducer
})