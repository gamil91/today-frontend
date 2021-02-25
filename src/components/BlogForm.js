import '../App.css';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/userActions'
import { updateBlogState, addBlogState } from '../redux/actions/blogsActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";


const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    display:'flex' 
  };


const buttonDiv = {
    margin:'auto',
    paddingBottom: '10px'
}

class BlogForm extends Component {

    state = {
        title: "",
        content: "",
        private: false,
        image: ""
    }

    componentDidMount(){
        if (this.props.blogID){
            let blog = this.props.blogs.find(b => b.id === this.props.blogID)
            this.setState({
                title: blog.title, 
                content: blog.content, 
                id:this.props.blogID, 
                private:blog.private, 
                image:blog.image})
                this.props.clearBlog()
            
        }
    }

    onChange = (e) => {
        e.persist()
        this.setState(() => {
            return {
                [e.target.name]: e.target.files[0]
            }})
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({[name]: value})
    }


    handleSubmit = (e) => {
       
        e.preventDefault()
        switch(true){
            case !!this.state.id && !!this.state.image.name :
                // debugger
                this.updateBlogWithImage(this.state.id)
                break
            case !!this.state.id :
                // debugger
                this.updateBlog(this.state)
                break
            case !!this.state.image.name :
                // debugger
                this.addBlogWithImage()
                break
            default :
                this.addBlog()
                break
        }
    }

    updateBlog = (blog) =>{
       
        const { title, content, id, image } = blog
        let info = { title, content, image, private: blog.private}

        let config = {
            method:  "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`},
            body: JSON.stringify(info)
            }

        fetch(`https://today-api.herokuapp.com/blogs/${id}`, config)
        .then(res => res.json())
        .then(data => {
            alert("Blog Succesfully Updated!")
            this.props.updateBlogState(data)
            this.props.handleHomeRender("")
        })
     
    }

    updateBlogWithImage = (id) => {
        const formData = new FormData()
        formData.append("image", this.state.image)
        formData.append('title', this.state.title)
        formData.append('content', this.state.content)
        formData.append('private', this.state.private)
        
        fetch(`https://today-api.herokuapp.com/blogs/${id}`, {
            method: "PATCH",
            body: formData })
        .then(res => res.json())
        .then(data => {
            this.props.updateBlogState(data)
            this.props.handleHomeRender("")})
    }


    addBlogWithImage = () => {
        const form = new FormData()
        form.append("image", this.state.image)
        form.append('title', this.state.title)
        form.append('content', this.state.content)
        form.append('private', this.state.private)
        form.append('token', localStorage.getItem('jwt'))
    
        fetch(`https://today-api.herokuapp.com/blogs`, {
            method: "POST",
            body: form })
        .then(res => res.json())
        .then(data => {
            this.props.addBlogState(data)
            this.props.handleHomeRender("")})
    }


    addBlog = () =>{
        const { title, content, image } = this.state
        let info = { title, content, image, private: this.state.private}
        // debugger
        let config = {
            method:  "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`},
            body: JSON.stringify(info)
            }

        fetch("https://today-api.herokuapp.com/blogs", config)
        .then(res => res.json())
        .then(data => {
        // debugger
            this.props.addBlogState(data)
            this.props.handleHomeRender("")
        })
        
    }

    removeFile = () => {
        this.setState({image:""})
   }  

    render() {
     
        return (
            <div >
                <div className="blog-form">
                    <h1>Slow Down & Reflect...</h1>
                    <br/>

                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group >
                            <p>How are you feeling?</p>
                            <Form.Control className="blogform-title" type="text" placeholder="Excited" name="title" value={this.state.title} onChange={this.handleChange}/>
                        </Form.Group>
            

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <p>Write about it</p>
                            <Form.Control className="blogform-content" size="lg" as="textarea" rows={5}  name="content" value={this.state.content} onChange={this.handleChange}/>
                        </Form.Group>

                        
                        
                        <p id="image-upload-text">Image Upload</p>
                            <label className="custom-file-upload">
                            <input type="file" name="image" onChange={this.onChange} />
                            <i><FontAwesomeIcon icon={faCloudUploadAlt}/></i> Attach
                            </label>
                            
                        <div style={styles}>
                            {!!this.state.image.name ? 
                            <div className="file-preview" onClick={this.removeFile}>{this.state.image.name}</div> : null}
                            { this.state.image === "" ? 
                            null : <div className="pic-preview" onClick={this.removeFile}><img src={this.state.image} alt=""/> </div> }
                        </div>

                        <div key={`inline-${"checkbox"}`} className="mb-3">
                        <Form.Check custom label="Private" className="private-text" type={"checkbox"} id={`inline-${"checkbox"}-1`}
                            checked={this.state.private}
                            onChange={() => {this.setState(prevState => {return{private: !prevState.private}})}}/>
                        </div>
                    
                    
                        <div style={buttonDiv}>
                            <Button id="comment-btn" type="submit">
                                Submit
                            </Button>
                        </div>

                    </Form>
                </div>
            </div>
        );
    }
}



export default withRouter(connect(state => ({blogs: state.allBlogs, user:state.user}), { updateBlogState, setUser, addBlogState })(BlogForm));
