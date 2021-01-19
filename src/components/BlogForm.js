import '../App.css';
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/userActions'
import { updateBlog, updateBlogState, addBlogState } from '../redux/actions/blogsActions'
import { withRouter } from 'react-router-dom'

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    display: 'flex',
  };

class BlogForm extends Component {

    componentDidMount(){
        if (this.props.blogID){
           let blog = this.props.blogs.find(b => b.id === this.props.blogID)
            this.setState({
                title: blog.title, 
                content: blog.content, 
                id:this.props.blogID, 
                private:blog.private, 
                image:blog.image})
        }
    }

    state = {
        title: "",
        content: "",
        private: false,
        image: ""
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({[name]: value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (!!this.props.blogID && !!this.state.image.name){
            this.props.updateBlogWithImage()
        } else if (!!this.props.blogID){
            this.props.updateBlog(this.state)
            this.props.handleHomeRender("")
        }
        else if (!!this.state.image.name) {
            this.addBlogWithImage()
        } else {
            this.addBlog()
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        switch(true){
            case !!this.props.blogID && !!this.state.image.name :
                this.updateBlogWithImage(this.props.blogID)
                break
            case !!this.props.blogID :
                this.props.updateBlog(this.state)
                this.props.handleHomeRender("")
                break
            case !!this.state.image.name :
                this.addBlogWithImage()
                break
            default :
                this.addBlog()
                break
        }
    }

    updateBlogWithImage = (id) => {
        const formData = new FormData()
        formData.append("image", this.state.image)
        formData.append('title', this.state.title)
        formData.append('content', this.state.content)
        formData.append('private', this.state.private)
        
        fetch(`http://localhost:3000/blogs/${id}`, {
            method: "PATCH",
            body: formData })
        .then(res => res.json())
        .then(data => {
            debugger
            this.props.updateBlogState(data)
            this.props.handleHomeRender("")})
    }

    onChange = (e) => {
        e.persist()
        this.setState(() => {
            return {
                [e.target.name]: e.target.files[0]
            }})
    }

    addBlogWithImage = () => {
        const form = new FormData()
        form.append("image", this.state.image)
        form.append('title', this.state.title)
        form.append('content', this.state.content)
        form.append('private', this.state.private)
        form.append('token', localStorage.getItem('jwt'))
    
        fetch(`http://localhost:3000/blogs`, {
            method: "POST",
            body: form })
        .then(res => res.json())
        .then(data => {
            this.props.addBlogState(data)
            this.props.handleHomeRender("")})
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
            this.props.addBlogState(data)
            this.props.handleHomeRender("")
        })
        
    }

    removeFile = () => {
        this.setState({image:""})
   }  

    render() {
        // debugger
        console.log(this.state)
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
                        checked={this.state.private}
                        onChange={() => {this.setState(prevState => {return{private: !prevState.private}})}}/>
                    </div>
 
                    <Form.Group>

                        <Form.Label>Image Upload</Form.Label><br/>
                        <div style={styles}>
                        <label className="custom-file-upload">
                        <input type="file" name="image" onChange={this.onChange} />
                        <i className="fa fa-cloud-upload" /> Attach
                        </label>
                        
                        {!!this.state.image.name ? 
                        <div className="file-preview" onClick={this.removeFile}>{this.state.image.name}</div> : null}

                          
                    </div>
                        { this.state.image === "" ? 
                        null : <div className="pic-preview" onClick={this.removeFile}><img src={this.state.image} alt=""/> </div> }
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



export default withRouter(connect(state => ({blogs: state.allBlogs, user:state.user}), { updateBlogState, setUser, updateBlog, addBlogState })(BlogForm));
