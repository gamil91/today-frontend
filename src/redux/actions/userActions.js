export function newUser(){
    return {type:"SET_NEW_USER"}
}

export function oldUser(){
    return {type:'SET_OLD_USER'}
}


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

        fetch(`https://today-api.herokuapp.com/users/${user.id}`, config)
        .then(res => res.json())
        .then((data) => {
            alert("Profile Succesfully Updated!")
            dispatch(setUser(data.user))
        })
     }
}

export function fetchUser(){
    return (dispatch) => {
        fetch('https://today-api.herokuapp.com/getuser', {
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
        fetch(`https://today-api.herokuapp.com/users/${id}`, {
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

