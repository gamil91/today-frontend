


export function updateUser(user){
    // debugger
    return (dispatch) => {
        let info = {
            name: user.name, 
            password: user.password}

        let config = {
            method:  "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(info)
          }

        fetch(`http://localhost:3000/users/${user.id}`, config)
        .then(res => res.json())
        .then((data) => {
            alert("Profile Succesfully Updated!")
            dispatch(setUser(data.user))
        })
     }
}

export function fetchUser(){
    return (dispatch) => {
        fetch('http://localhost:3000/getuser', {
            method: 'GET',
            headers: {
                "Content-Type" : "application/json",
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            }})
            .then(res => res.json())
            .then(data => dispatch(setUser(data.user)))
    }
}


export function setUser(user){
    return { type: 'SET_USER', payload: user}
}

export function deleteUser(id){
    return (dispatch) => {
        fetch(`http://localhost:3000/users/${id}`, {
        method:  "DELETE",
        headers: {"Content-Type": "application/json"}})
        .then(() => dispatch(logoutUser()))
    }
}

export function logoutUser(){
    return (dispatch) => {
        localStorage.clear()
        dispatch({type: "LOG_OUT"})
    }
}

