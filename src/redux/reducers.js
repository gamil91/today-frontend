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
            debugger
            return state
        case "UPDATE_TASK":
            return state
        case "DELETE_TASK":
            return state
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

        case "ADD_COMMENT":
            let toCommentLikedBlog = state.find(b => b.id === action.payload.blog_id)
            if (!!toCommentLikedBlog){
                let blogLikedIdx = state.map(x => x.id).indexOf(action.payload.blog_id)
                let commentsLikedArr = [...toCommentLikedBlog.comments, action.payload]
                let commentedLikedBlog = {...toCommentLikedBlog, comments: commentsLikedArr}
                let startLikedSlice = state.slice(0, blogLikedIdx)
                let endLikedSlice = state.slice(blogLikedIdx+1)
                return [...startLikedSlice, commentedLikedBlog, ...endLikedSlice]
            } else {
                return state
            }

        case "UPDATE_COMMENT":
            let toUpdateCommentLikedBlog = state.find(b => b.id === action.payload.blog_id)
            
            if(!!toUpdateCommentLikedBlog){
                let likedBlogIdxUpdate = state.map(x => x.id).indexOf(action.payload.blog_id)
                let likedBlogCommentIdx = toUpdateCommentLikedBlog.comments.map(x => x.id).indexOf(action.payload.id)
                let likedBlogStartComments = toUpdateCommentLikedBlog.comments.slice(0, likedBlogCommentIdx)
                let likedBlogEndComments = toUpdateCommentLikedBlog.comments.slice(likedBlogCommentIdx + 1)
                let likedBlogUpdated = {...toUpdateCommentLikedBlog, comments: [...likedBlogStartComments, action.payload, ...likedBlogEndComments]}
                let likedBlogsStartUpdate = state.slice(0, likedBlogIdxUpdate)
                let likedBlogsEndUpdate = state.slice(likedBlogIdxUpdate+1)
                return [...likedBlogsStartUpdate, likedBlogUpdated, ...likedBlogsEndUpdate]
            } else {
                return state
            }

        case "DELETE_COMMENT":
            let toDeleteCommentLikedBlog = state.find(b => b.id === action.payload.blog_id)
            if (!!toDeleteCommentLikedBlog){
                let likedBlogIdxDelete = state.map(x => x.id).indexOf(action.payload.blog_id)
                let filteredCommentsLikedBlog = toDeleteCommentLikedBlog.comments.filter(c => c.id !== action.payload.id)
                let deleteCommentLikedBlog = {...toDeleteCommentLikedBlog, comments: filteredCommentsLikedBlog}
                let likedBlogStartDelete = state.slice(0, likedBlogIdxDelete)
                let likedBlogEndDelete = state.slice(likedBlogIdxDelete+1)
                return [...likedBlogStartDelete, deleteCommentLikedBlog, ...likedBlogEndDelete]
            } else {
                return state 
            }
    
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
        case "UPDATE_BLOG":
            let updatedIdx = state.map(x => x.id).indexOf(action.payload.id)
            let notUpdatedSliceStart = state.slice(0, updatedIdx)
            let notUpdatedSliceEnd = state.slice(updatedIdx + 1)
            return [...notUpdatedSliceStart, action.payload, ...notUpdatedSliceEnd]
        case "DELETE_BLOG":
            let updated = state.filter(b => b.id !== action.payload)
            return updated

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

        case "ADD_COMMENT":
            let toCommentBlog = state.find(b => b.id === action.payload.blog_id)
            let blogIdx = state.map(x => x.id).indexOf(action.payload.blog_id)
            // debugger
            let commentsArr = [...toCommentBlog.comments, action.payload]
            let commentedBlog = {...toCommentBlog, comments: commentsArr}

            let startSlice = state.slice(0, blogIdx)
            let endSlice = state.slice(blogIdx+1)
            return [...startSlice, commentedBlog, ...endSlice]
            
        case "UPDATE_COMMENT":
            // look for the blog and look for the indx of that blog
            let toUpdateCommentBlog = state.find(b => b.id === action.payload.blog_id)
            let blogIdxUpdate = state.map(x => x.id).indexOf(action.payload.blog_id)
            // traverse through that blogs comments and find THE comment
            // find the index of that comment
            let commentIdx = toUpdateCommentBlog.comments.map(x => x.id).indexOf(action.payload.id)
            // slice through toUpdateBlog.comments start and end
            let startComments = toUpdateCommentBlog.comments.slice(0, commentIdx)
            let endComments = toUpdateCommentBlog.comments.slice(commentIdx + 1)
            // spread out updatedCommentBlog
            // spread out the [start, Updatedcomment, end]...toUpdateBlog.comments
            let updatedCommentBlog = {...toUpdateCommentBlog, comments: [...startComments, action.payload, ...endComments]}
            // slice through state start and end, spread out again with that blog
            let startUpdate = state.slice(0, blogIdxUpdate)
            let endUpdate = state.slice(blogIdxUpdate+1)
            return [...startUpdate, updatedCommentBlog, ...endUpdate]
            

        case "DELETE_COMMENT":
            
            let toDeleteCommentBlog = state.find(b => b.id === action.payload.blog_id)
            let blogIdxDelete = state.map(x => x.id).indexOf(action.payload.blog_id)
            let filteredComments = toDeleteCommentBlog.comments.filter(c => c.id !== action.payload.id)
            let deleteCommentBlog = {...toDeleteCommentBlog, comments: filteredComments}
            let startDelete = state.slice(0, blogIdxDelete)
            let endDelete = state.slice(blogIdxDelete+1)
            return [...startDelete, deleteCommentBlog, ...endDelete]

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


