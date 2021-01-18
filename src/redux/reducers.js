import { combineReducers } from 'redux';

const initialState = {
    user: {name: "", id: ""},
    allBlogs: [],
    likedBlogs: []
}

const userReducer = (state = initialState.user, action) => {
    switch(action.type){
        case "LOG_OUT":
            return {name: "", id: ""}
        case "SET_USER":
            return {name: action.payload.name, id: action.payload.id}
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
        case "LOG_OUT":
            return []
        default:
            return state
    }
}

const blogsReducer = (state = initialState.allBlogs, action) => {
    switch(action.type){
        case "LOG_OUT":
            return []
        case "SET_BLOGS":
            return action.payload.reverse()
        case "ADD_BLOG":
            return [action.payload, ...state]

        case "ADD_LIKE":
            //find the blog to LIKE and get the index, go to the user_likes attr of that blog
            //add the user who liked the blog
            //spread out blog and add on updated user_likes
            let findBlog = state.find(b => b.id === action.payload.blog.id)
            let index = state.map(x => x.id).indexOf(action.payload.blog.id)
            let likedBlog = {...findBlog, user_likes:[...findBlog.user_likes, action.payload.user]}
            //to keep positions on rerender
            //using the found index, slice the beginning and the end of the previous state
            //sandwich the updatedBlog with the slices of the previous state
            let begin = state.slice(0, index)
            let ending = state.slice(index + 1)
            return [...begin, likedBlog, ...ending]


        case "UNLIKE_BLOG":
            //find blog to UNLIKE and get the index, go to the user_likes attr of that blog
            //filter out the user to remove, spread out blog and add on updated user_likes array
            let toUnlike = state.find(b => b.id === action.payload.blog.id)
            let idx = state.map(x => x.id).indexOf(action.payload.blog.id)
            let userLikes = toUnlike.user_likes.filter(ul => ul.id !== action.payload.user.id)
            let updatedBlog = {...toUnlike, user_likes: userLikes}
             //to keep positions on rerender
            //using the found index, slice the beginning and the end of the previous state
            //sandwich the updatedBlog with the slices of the previous state
            let first = state.slice(0, idx)
            let end = state.slice(idx+1)
            return [...first, updatedBlog, ...end]
        case "UPDATE_BLOG":
            let updatedIdx = state.map(x => x.id).indexOf(action.payload.id)
            let notUpdatedSliceStart = state.slice(0, updatedIdx)
            let notUpdatedSliceEnd = state.slice(updatedIdx + 1)
            return [...notUpdatedSliceStart, action.payload, ...notUpdatedSliceEnd]
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