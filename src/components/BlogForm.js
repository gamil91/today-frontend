import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/userActions'
import { updateBlog } from '../redux/actions/blogsActions'
import { withRouter } from 'react-router-dom'

class BlogForm extends Component {

    componentDidMount(){
        if (this.props.id){
           let blog = this.props.blogs.find(b => b.id === this.props.id)
            this.setState({title: blog.title, content: blog.content, id:this.props.id})
        }
    }

    state = {
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
        if (!!this.props.id){
            this.props.updateBlog(this.state)
            this.props.handleHomeRender("")} 
        else {this.addBlog()}
    }

    addBlog = () =>{
        const { title, content } = this.state
        let info = { title, content, private: this.state.private}

        let config = {
            method:  "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`},
            body: JSON.stringify(info)
            }

        fetch("http://localhost:3000/blogs", config)
        .then(res => res.json())
        .then(data => {
            this.props.setUser(data.user)
            this.props.handleHomeRender("")
        })
        
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

export default withRouter(connect(state => ({blogs: state.user.blogs}), { setUser, updateBlog })(BlogForm));
