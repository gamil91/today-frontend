import { combineReducers } from 'redux';

const initialState = {
    user: null,
    userBlogs: [],
    allBlogs: []
}

const userReducer = (state = initialState.user, action) => {
    // debugger
    switch(action.type){
        case "SET_USER":
            return action.payload
        default:
            return state
    }

}



export default combineReducers({
    user: userReducer
})