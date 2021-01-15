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
        default:
            return state
    }
}

const blogReducer = (state = initialState.allBlogs, action) => {
    switch(action.type){
        default:
            return state
    }
}



export default combineReducers({
    user: userReducer,
    allBlogs: blogReducer
})