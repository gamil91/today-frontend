import React, { Component } from 'react';
import { setUser } from '../redux/actions'
import { connect } from 'react-redux';
import Form from './UserForm'
import TopNav from './TopNav'

class Home extends Component {

    componentDidMount(){
        fetch('http://localhost:3000/getuser', {
            method: 'GET',
            headers: {
                "Content-Type" : "application/json",
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            }})
            .then(res => res.json())
            .then(data => this.props.setUser(data.user))
    }
    
    render() {
        
        switch(true) {
            case (this.props.edit): 
                return (
                    <div>
                        <TopNav/>
                         <Form name="editprofile"/>
                    </div>
                )
            default:
                return (
                    <div>
                        <TopNav/> 
                    </div>
                );

        }
    }
}

export default connect(null, {setUser})(Home);
