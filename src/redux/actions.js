
export function createUser(user){

    return (dispatch) => {
        let info = {
            name: user.name, 
            email: user.email, 
            password: user.password}

        let config = {
            method:  "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(info)
          }

        fetch("http://localhost:3000/users", config)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('jwt', data.token)
            // dispatch({type: "SET_USER", payload: data.user})
        })}
}

export function setUser(user){
    return { type: 'SET_USER', payload: user}
}

export function updateUser(user){
    console.log(user)
    return user
}