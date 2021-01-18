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
            let commentsArr = [...toCommentBlog.comments, action.payload]
            let commentedBlog = {...toCommentBlog, comments: commentsArr}

            let startSlice = state.slice(0, blogIdx)
            let endSlice = state.slice(blogIdx+1)
            return [...startSlice, commentedBlog, ...endSlice]
        case "UPDATE_COMMENT":
            // look for the blog
            let toUpdateCommentBlog = state.find(b => b.id === action.payload.blog_id)
            // look for the indx
            let blogIdxUpdate = state.map(x => x.id).indexOf(action.payload.blog_id)
            // traverse through that blogs comments and find THE comment
            // let updateComment = toUpdateCommentBlog.comments.find(c => c.id === action.payload.id)
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



export default combineReducers({
    user: userReducer,
    likedBlogs: likesReducer,
    allBlogs: blogsReducer
})