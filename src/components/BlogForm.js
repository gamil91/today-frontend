import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux';

class BlogForm extends Component {

    state = {
        id: this.props.id,
        title: "",
        content: "",
        private: false
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({[name]: value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
    }

    render() {
        console.log(this.state.private)
        return (
            <div className='login_screen'>
            <div>
            <h1>Slow down & Reflect...</h1>
            <br/>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group >
                        <Form.Label>How are you?</Form.Label>
                        <Form.Control type="text" placeholder="Excited" name="title" value={this.state.title} onChange={this.handleChange}/>
                    </Form.Group>
                    
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Write about it</Form.Label>
                        <Form.Control size="lg" as="textarea" rows={5}  name="content" value={this.state.content} onChange={this.handleChange}/>
                    </Form.Group>

                    <div key={`inline-${"checkbox"}`} className="mb-3">
                    <Form.Check inline label="Private" type={"checkbox"} id={`inline-${"checkbox"}-1`}
                    onClick={() => {this.setState(prevState => {return{private: !prevState.private}})}}/>
                    </div>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            </div>
        );
    }
}

export default connect(state=>({id: state.user.id}))(BlogForm);
