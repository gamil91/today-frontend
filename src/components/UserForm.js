import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import { createUser, updateUser, setUser } from '../redux/actions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'



class UserForm extends Component {

    state = {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    }

    componentDidMount() {
        if (localStorage.getItem('jwt')){
            fetch('http://localhost:3000/getuser',{
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            }})
            .then(res => res.json())
            .then(data => this.setState({name: data.user.name}))
        }
    }



    handleOnChange = (e) => {
        const {name , value} = e.target
        this.setState({[name]: value})
    }

    handleOnSubmit = (e) => {
        e.preventDefault()

        switch(true){
            case (this.props.name === "editprofile"):
                this.props.updateUser(this.state)
                this.props.history.push('/home')
                break
            default:
                this.props.createUser(this.state)
                this.props.history.push('/home')
                break
            }
    }


    render() {
        
        return (
        <div className='login_screen'>
        <br/>
            <div>
            <h2> Sign Up Form</h2>
            <br/>

            <Form onSubmit={(e) => this.handleOnSubmit(e)}>
            <Form.Group >
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" 
                        value={this.state.name}
                        onChange={(e) => this.handleOnChange(e)} 
                        type="name" 
                        placeholder="Enter name" />
                {this.props.name === "editprofile" ? 
                <Form.Text className="text-muted">
                We'll never share your info with anyone else.
                </Form.Text> : null}
            </Form.Group>

            {this.props.name === "editprofile" ? null :
            <Form.Group >
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" 
                            type="email" 
                            placeholder="Enter email" 
                            onChange={(e) => this.handleOnChange(e)}/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>}

            <Form.Group >
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e) => this.handleOnChange(e)}/>
            </Form.Group>
            

            <Form.Group >
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control name="password_confirmation" type="password" placeholder="Password" onChange={(e) => this.handleOnChange(e)}/>
            </Form.Group>
            

            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
            
            </div>
        </div>
        );
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         createUser: (user) => { dispatch(createUser(user))}
//     }
// }

export default withRouter(connect(null, { createUser, updateUser, setUser })(UserForm));
// export default withRouter(connect(state => ({user:state.user}), mapDispatchToProps)(UserForm));
