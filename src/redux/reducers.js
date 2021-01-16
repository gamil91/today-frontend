import { combineReducers } from 'redux';

const initialState = {
    user: {name: "", blogs: [], liked_blogs: []},
    allBlogs: []
}

const userReducer = (state = initialState.user, action) => {
    // debugger
    switch(action.type){
        case "SET_USER":
            return action.payload
        case "LOG_OUT":
            return initialState.user
        case "DELETE_BLOG":
            let updated = state.blogs.filter(b => b.id !== action.payload)
            return {...state, blogs:updated}
        default:
            return state
    }
}

const blogsReducer = (state = initialState.allBlogs, action) => {
    switch(action.type){
        default:
            return state
    }
}



export default combineReducers({
    user: userReducer,
    allBlogs: blogsReducer
})