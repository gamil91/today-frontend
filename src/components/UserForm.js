import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelopeOpenText, faUnlockAlt, faLock } from "@fortawesome/free-solid-svg-icons";
import '../css/UserForm.css'

import DeleteModal from './DeleteModal'
import { updateUser, logoutUser, setUser, newUser } from '../redux/actions/userActions'


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
            case (this.props.screen === "Update your account" && 
                this.state.password !== this.state.password_confirmation):
                alert("Passwords do not match, please try again.")
                this.setState({password: "", password_confirmation: ""})
                break
            case (this.props.screen === "Update your account"):
                this.props.updateUser(this.state)
                this.setState({name: "", password: "", password_confirmation: ""})
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
            this.setState({email: "", password: "", name: "", password_confirmation: ""})
            this.props.history.push('/home')
                if(this.props.screen === "Sign up"){
                    this.props.newUser()
                }
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
        this.setState({name: "", password: "", password_confirmation: ""})
        this.deleteUser(this.props.user.id)
    }

    openModal = () => {this.setState({ openDeleteModal: true, modalDelete: true})}
    closeModal = () => this.setState({ openDeleteModal: false });


    
    render() {
        // debugger
        return (

        
            <div className="login_screen">
                <p id="logo-font">Today.</p>
                <h2> {this.props.screen}</h2>
                <br/>
                <Form onSubmit={(e) => this.handleOnSubmit(e)} >


                    {this.props.screen === "Log in" ? null :
                    <Form.Group >
                        
                        <p><i><FontAwesomeIcon icon={faUser} area-hidden="true"/> {" "}</i>Name</p> 
                        <Form.Control  name="name" value={ this.state.name } onChange={(e) => this.handleOnChange(e)} type="name" placeholder="Enter name" />

                    </Form.Group>}

                    {this.props.screen === "Update your account" ? null :
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <p><i><FontAwesomeIcon icon={faEnvelopeOpenText} area-hidden="true"/> {" "}</i>Email Address</p> 
                        <Form.Control  value={this.state.email} name="email" type="email" placeholder="Enter email" onChange={(e) => this.handleOnChange(e)}/>

                        <Form.Control.Feedback type="invalid">
                        Please provide an email address.
                        </Form.Control.Feedback>


                    </Form.Group>}
                    
                    <Form.Group >
                        <p><i><FontAwesomeIcon icon={faUnlockAlt} area-hidden="true"/> {" "}</i>Password</p> 
                        <Form.Control value={this.state.password} name="password" type="password" placeholder="Password" onChange={(e) => this.handleOnChange(e)}/>
                    </Form.Group>
                    

                    {this.props.screen === "Log in" ? null :
                    <Form.Group >
                        <p><i><FontAwesomeIcon icon={faLock} area-hidden="true"/> {" "}</i>Password Confirmation</p> 
                        <Form.Control  value={this.state.password_confirmation} name="password_confirmation" type="password" placeholder="Password" onChange={(e) => this.handleOnChange(e)}/>
                    </Form.Group>}
                    
                    <Button variant="outline-light" type="submit">
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
            
        
            { this.state.modalDelete ?
            <DeleteModal
                closeModal={this.closeModal}
                openModal={this.state.openDeleteModal}
                handleDelete={this.handleDelete}/> : null }

        </div>
            
        
        

        );
    }
}



export default withRouter(connect(state => ({user: state.user}), { logoutUser, updateUser, setUser, newUser })(UserForm));

