

export function reorderList (droppableIdStart, 
                    droppableIdEnd, 
                    droppableIndexStart, 
                    droppableIndexEnd, 
                    draggableId,
                    type)  {
                        
    return {type: "DRAG_HAPPENED", 
            payload: { droppableIdStart,
                    droppableIdEnd,
                    droppableIndexStart,
                    droppableIndexEnd,
                    draggableId,
                    type}
            }
    }

    



export function addList(list){
    return (dispatch) => {

        let info = {title: list}
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`},
            body: JSON.stringify(info)
        }
        fetch(`http://localhost:3000/lists`, config)
        .then(res => res.json())
        .then(data => dispatch(addListToState(data)))
    }
}

function addListToState(data){
    return {type:"ADD_LIST", payload: data}
}

export function updateList(data){
    // debugger
    return (dispatch) => {

        let info = {title: data.title}
        let config = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(info)}
        
        fetch(`http://localhost:3000/lists/${data.id}`, config)
        .then(res => res.json())
        .then(data => dispatch(updateListInState(data)))

    }
}

export function updateListInState(data){
    return {type:"UPDATE_LIST", payload: data}
}



export function deleteList(id){
   
    return (dispatch) => {
        let config = {
            method: "DELETE",
            headers: {"Content-Type": "application/json",
            'Authorization' : `Bearer ${localStorage.getItem('jwt')}`}
        }
        fetch(`http://localhost:3000/lists/${id}`, config)
        .then(res => res.json())
        .then(data => dispatch(deleteListInState(data)))
    }
}

function deleteListInState(data){
    return {type:"DELETE_LIST", payload: data}
}

export function fetchLists () {
    return (dispatch) => {
        let config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`}
        }
        fetch(`http://localhost:3000/getlists`, config)
        .then(res => res.json())
        .then(data => {
            debugger
            dispatch(setLists(data))
        })
    }
}

function setLists(data) {
    return {type:"SET_LIST", payload: data}
}