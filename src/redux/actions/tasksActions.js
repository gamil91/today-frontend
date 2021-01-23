export function addTask(data) {
    // debugger
    return (dispatch) => {
        let info = {name: data.taskName, finished: data.finished, list_id: data.id}

        let config = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(info)}

        fetch(`http://localhost:3000/tasks`, config)
        .then(res => res.json())
        .then(data => dispatch(addTaskToState(data)))
    }
}

function addTaskToState(data){
    return ({type: "ADD_TASK", payload: data})
}
