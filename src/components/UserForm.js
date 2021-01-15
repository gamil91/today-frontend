import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import { createUser, updateUser, deleteUser, setUser } from '../redux/actions'
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
        // validated: false
    }

     

    handleOnChange = (e) => {
        const {name , value} = e.target
        this.setState({[name]: value})
    }

    handleOnSubmit = (e) => {
        // debugger
        e.preventDefault()
        // let form = e.currentTarget
        // if (form.checkValidity() === false){
        //     e.stopPropagation()
        // } else {
        //     this.setState({validated:true})
        switch(true){
            case (this.props.name === "Log in"):
                this.loginUser(this.state)
                break
            case (e.target.textContent === "Delete my account"):
                this.openModal(this.props.user.id)
                break
            case (this.props.name === "Update your account"):
                this.props.updateUser(this.state)
                this.props.history.push('/home')
                break
            default:
                this.props.createUser(this.state)
                this.props.history.push('/home')
                break
            }
        // }
    }

    loginUser = (user) =>{
        let info = {
        email: user.email, 
        password: user.password}
    
        let config = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(info)
        }
        fetch(`http://localhost:3000/login`, config)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('jwt', data.token)
            this.props.setUser(data.user) 
            this.props.history.push('/home')
        })
    }

    handleDelete = () => {
        this.props.deleteUser(this.props.user.id)
        this.closeModal()
        this.props.history.push('/login')
    }

    openModal = () => {this.setState({ openDeleteModal: true, modalDelete: true})}
    closeModal = () => this.setState({ openDeleteModal: false });

    render() {

        // debugger
        return (
        <div className='login_screen'>
        <br/>
            <div>
            <h2> {this.props.name}</h2>
            <br/>
            {/* <Form onSubmit={(e) => this.handleOnSubmit(e)} noValidate validated={this.state.validated}></Form> */}
            <Form onSubmit={(e) => this.handleOnSubmit(e)} >
                {this.props.name === "Log in" ? null :
                <Form.Group >
                    <Form.Label>Name</Form.Label>
                    <Form.Control  name="name" value={this.state.name} onChange={(e) => this.handleOnChange(e)} type="name" placeholder="Enter name" />

                    {this.props.name === "Update your account" ? 
                    <Form.Text className="text-muted">
                        We'll never share your info with anyone else.
                    </Form.Text> : null}

                </Form.Group>}

                {this.props.name === "Update your account" ? null :
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control  name="email" type="email" placeholder="Enter email" onChange={(e) => this.handleOnChange(e)}/>

                    <Form.Control.Feedback type="invalid">
                    Please provide an email address.
                    </Form.Control.Feedback>

                    {this.props.name === "Sign up" ?
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text> : null}

                </Form.Group>}

                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control  name="password" type="password" placeholder="Password" onChange={(e) => this.handleOnChange(e)}/>
                </Form.Group>
                

                {this.props.name === "Log in" ? null :
                <Form.Group >
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control  name="password_confirmation" type="password" placeholder="Password" onChange={(e) => this.handleOnChange(e)}/>
                </Form.Group>}
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <br/>
            {this.props.name === "Sign up" ?
            <h5>I have an account! <Link to="/login" >Log in!</Link></h5> : null }

            {this.props.name === "Log in" ?
            <h5>Don't have an account? <Link to="/signup" >Sign up!</Link></h5> : null }

            {this.props.name === "Update your account" ?
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



export default withRouter(connect(state => ({user: state.user}), { createUser, updateUser, deleteUser, setUser })(UserForm));

