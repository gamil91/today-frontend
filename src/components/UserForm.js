import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import { updateUser, logoutUser, setUser } from '../redux/actions/userActions'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import DeleteModal from './DeleteModal'



class UserForm extends Component {

    state = {
        id: this.props.user.id || "",
        name: this.props.user.name || "",
        email: "",
        password: "",
        password_confirmation: "",
        modalDelete: false,
        openDeleteModal: false
    }


    handleOnChange = (e) => {
        const {name , value} = e.target
        this.setState({[name]: value})
    }

    handleOnSubmit = (e) => {
    //   debugger
        e.preventDefault()
        
        switch(true){
            case (this.props.screen === "Log in"):
                this.loginUser(this.state)
                break
            case (e.target.textContent === "Delete my account"):
                this.openModal(this.props.user.id)
                break
            case (this.props.screen === "Update your account"):
                this.props.updateUser(this.state)
                this.props.history.push('/home')
                break
            case (this.props.screen === "Sign up" && this.state.password !== this.state.password_confirmation):
                alert("Passwords do not match, please try again.")
                this.setState({password: "", password_confirmation: ""})
                break
            case (this.props.screen === "Sign up"):
                this.createUser(this.state)
                break
            default:
                break
            }
    }

    loginUser = (user) =>{
        
        let info = {
        email: user.email, 
        password: user.password}
        this.handleAuth(info, "POST", "http://localhost:3000/login")
    }

    createUser = (user) => {

        let info = {
        name: user.name, 
        email: user.email, 
        password: user.password}
        this.handleAuth(info, "POST", "http://localhost:3000/users")
    }

    handleAuth = (info, method, url) => {

        let config = {
            method:  method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(info)
          }

        fetch(url, config)
        .then(res => res.json())
        .then(data => {
            if (data.error){
                alert(`${data.error}`)
                this.setState({email: "", password: "", name: "", password_confirmation: ""})
            } else {
            localStorage.setItem('jwt', data.token)
            this.props.setUser(data.user) 

                if (this.props.location.pathname === "/signup"){
                    this.props.newUser()
                }

            this.props.history.push('/home')
            
            }
        })

    }

    deleteUser = (id) =>{
        fetch(`http://localhost:3000/users/${id}`, {
            method:  "DELETE",
            headers: {"Content-Type": "application/json"}})
            .then(() => {
                localStorage.clear()
                this.props.history.push('/login')
                this.props.logoutUser()}
            )
    }
    

    handleDelete = () => {
        this.closeModal()
        // this.props.history.push('/login')
        this.deleteUser(this.props.user.id)
    }

    openModal = () => {this.setState({ openDeleteModal: true, modalDelete: true})}
    closeModal = () => this.setState({ openDeleteModal: false });


    ////////trail upload

    onChange = (e) => {
        // debugger
        e.persist()
        this.setState(() => {
            return {
                [e.target.name]: e.target.files[0]
            }
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append("image", this.state.image)
        fetch(`http://localhost:3000/blogs`, {
            method: "POST",
            body: form
        })
}

    
    render() {
        console.log(this.props.location)
        // console.log(this.state.image)
        // debugger
        return (
        <div className='login_screen'>


            {/* <form onSubmit={this.onSubmit}>
                <label>Image Upload</label><br/>
                <input type="file" name="image" onChange={this.onChange}/><br/> 
                <input type="submit"/>
            </form> */}
        


        <br/>
            <div>
            <h2> {this.props.screen}</h2>
            <br/>
            <Form onSubmit={(e) => this.handleOnSubmit(e)} >

                {/* <Form.Group>
                    <Form.Label>Image Upload</Form.Label><br/>
                    <Form.Control type="file" name="image" onChange={this.onChange}/><br/> 
                </Form.Group> */}

                {this.props.screen === "Log in" ? null :
                <Form.Group >
                    <Form.Label>Name</Form.Label>
                    <Form.Control  name="name" value={ this.state.name } onChange={(e) => this.handleOnChange(e)} type="name" placeholder="Enter name" />

                    {this.props.screen === "Update your account" ? 
                    <Form.Text className="text-muted">
                        We'll never share your info with anyone else.
                    </Form.Text> : null}

                </Form.Group>}

                {this.props.screen === "Update your account" ? null :
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control  value={this.state.email} name="email" type="email" placeholder="Enter email" onChange={(e) => this.handleOnChange(e)}/>

                    <Form.Control.Feedback type="invalid">
                    Please provide an email address.
                    </Form.Control.Feedback>

                    {this.props.screen === "Sign up" ?
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text> : null}

                </Form.Group>}

                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={this.state.password} name="password" type="password" placeholder="Password" onChange={(e) => this.handleOnChange(e)}/>
                </Form.Group>
                

                {this.props.screen === "Log in" ? null :
                <Form.Group >
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control  value={this.state.password_confirmation} name="password_confirmation" type="password" placeholder="Password" onChange={(e) => this.handleOnChange(e)}/>
                </Form.Group>}
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <br/>
            {this.props.screen === "Sign up" ?
            <h5>I have an account! <Link to="/login" >Log in!</Link></h5> : null }

            {this.props.screen === "Log in" ?
            <h5>Don't have an account? <Link to="/signup" >Sign up!</Link></h5> : null }

            {this.props.screen === "Update your account" ?
            <Button variant="outline-danger" type="submit" onClick={this.handleOnSubmit}>Delete my account</Button> : null}
            </div>
                { this.state.modalDelete ?
                <DeleteModal
                    closeModal={this.closeModal}
                    openModal={this.state.openDeleteModal}
                    handleDelete={this.handleDelete}
                /> : null }


        </div>
        );
    }
}



export default withRouter(connect(state => ({user: state.user}), { logoutUser, updateUser, setUser })(UserForm));

