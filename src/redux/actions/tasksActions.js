export function addTask(data) {
    // debugger
    return (dispatch) => {
        let info = {name: data.taskName, finished: data.finished, list_id: data.id}

        let config = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(info)}

        fetch(`https://today-api.herokuapp.com/tasks`, config)
        .then(res => res.json())
        .then(data => {
            
            dispatch(addTaskToState(data))
        })
    }
}

function addTaskToState(data){
    return ({type: "ADD_TASK", payload: data})
}

export function updateTask(data){
    return (dispatch) => {
        let info = {name: data.taskName, finished: data.finished}

        let config = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(info)}

        fetch(`https://today-api.herokuapp.com/tasks/${data.taskId}`, config)
        .then(res => res.json())
        .then(data => dispatch(updateTaskInState(data)))
    }
}

function updateTaskInState(data){
    return ({type: "UPDATE_TASK", payload: data})
}

export function deleteTask(id){
    
    return (dispatch) => {

        let config = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}}

        fetch(`https://today-api.herokuapp.com/tasks/${id}`, config)
        .then(res => res.json())
        .then(data => {dispatch(deleteTaskInState(data))})
    }
}

function deleteTaskInState(data){
    return ({type: "DELETE_TASK", payload: data})
}