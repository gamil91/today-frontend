import { combineReducers } from 'redux';

const initialState = {
    user: {name: "", id: ""},
    allBlogs: [],
    likedBlogs: [],
    newUser: false,
    lists: []
}



const userReducer = (state = initialState.user, action) => {
    switch(action.type){
        case "SET_USER":
            return {name: action.payload.name, id: action.payload.id}
        case "LOG_OUT":
            return {name: "", id: ""}
        default:
            return state
    }
}
 
const listsReducer = (state = initialState.lists, action) => {
    switch (action.type){
        case "SET_USER":
            return action.payload.lists
        case "ADD_LIST":
            return [...state, action.payload]
        case "UPDATE_LIST":
            return state.map(list => list.id === action.payload.id ? action.payload : list)
        case "DELETE_LIST":
            return state.filter(list => list.id !== action.payload.id)
        case "ADD_TASK":
            return state.map(list => list.id !== action.payload.list_id ? list : {...list, tasks:[...list.tasks, action.payload]})
        case "UPDATE_TASK":
            return state.map(list => list.id !== action.payload.list_id ? list : {...list, tasks:list.tasks.map(task => task.id !== action.payload.id ? task : action.payload)})
        case "DELETE_TASK":
            return state.map(list => list.id !== action.payload.list_id ? list : {...list, tasks:list.tasks.filter(task => task.id !== action.payload.id)})
        case "DRAG_HAPPENED":
            // debugger
            const { droppableIdStart, 
                droppableIdEnd, 
                droppableIndexStart, 
                droppableIndexEnd, 
                draggableId,
                type} = action.payload;

            const newState = [...state]

            if(type === "list"){
                debugger
                const list = newState.splice(parseInt(droppableIndexStart),1)
                newState.splice(parseInt(droppableIndexEnd), 0, ...list)
                return newState 
            }
            
            if (droppableIdStart === droppableIdEnd){
                const list = state.find(list => parseInt(droppableIdStart) === list.id)
                const taskCard = list.tasks.splice(parseInt(droppableIndexStart), 1)
                list.tasks.splice(parseInt(droppableIndexEnd), 0, ...taskCard)
            }

            if(droppableIdStart !== droppableIdEnd){
                const listStart = state.find(list => parseInt(droppableIdStart) === list.id)
                const taskCard = listStart.tasks.splice(parseInt(droppableIndexStart), 1)
                const listEnd = state.find(list => parseInt(droppableIdEnd) === list.id)
                listEnd.tasks.splice(droppableIndexEnd, 0, ...taskCard)
            }

            return newState
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
            return action.payload
        case "ADD_BLOG":
            return [action.payload, ...state]
        case "UPDATE_BLOG":
            return state.map(blog => blog.id !== action.payload.id ? blog : action.payload)
        case "DELETE_BLOG":
            let updated = state.filter(b => b.id !== action.payload)
            return updated   
        case "ADD_LIKE":
            return state.map(blog => blog.id !== action.payload.blog.id ? blog : {...blog, user_likes:[...blog.user_likes, action.payload.user]})
        case "UNLIKE_BLOG":
            return state.map(blog => blog.id !== action.payload.blog.id ? blog : {...blog, user_likes: blog.user_likes.filter(ul => ul.id !== action.payload.user.id)})
        case "ADD_COMMENT":
            return state.map(blog => blog.id !== action.payload.blog_id ? blog : {...blog, comments:[...blog.comments, action.payload]})
        case "UPDATE_COMMENT":
            return state.map(blog => blog.id !== action.payload.blog_id ? blog : {...blog, comments:blog.comments.map(comment => comment.id !== action.payload.id ? comment : action.payload)})
        case "DELETE_COMMENT":
            return state.map(blog => blog.id !== action.payload.blog_id ? blog : {...blog, comments: blog.comments.filter(comment => comment.id !== action.payload.id)})
        default:
            return state
    }
}

const newUserReducer = (state = initialState.newUser, action) => {
    switch(action.type){
        case "SET_NEW_USER":
            return true
        case "SET_OLD_USER":
            return false
        default:
            return state
    }
}

export default combineReducers({
    user: userReducer,
    likedBlogs: likesReducer,
    allBlogs: blogsReducer,
    newUser: newUserReducer,
    lists: listsReducer
})


