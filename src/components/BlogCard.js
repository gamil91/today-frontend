import '../css/BlogCard.css'
import React, { Component } from 'react';
import { Card, Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux';
import { deleteBlog, likeBlog, unlikeBlog } from '../redux/actions/blogsActions'
import EditBlogModal from './EditBlogModal'

class BlogCard extends Component {


    


    render() {
        const { title, content, user, created_at, user_likes, id, user_id } = this.props.blog

        const handleLike = (e) => {
            e.target.textContent === "UNLIKE" ? 
            this.props.unlikeBlog(id)  : 
            this.props.likeBlog(id)
        }
        
        
    // debugger
        return (
            <div id="blog-card">
                <Card className="mb-2 text-center card" key={5} text={"white"}
                    style={{ width: '50rem' }}>

                    <Card.Header as="h5">{title}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                        <p>
                          {content}
                        </p>
                        <footer className="blockquote-footer">
                            {`${user} ${created_at}`}
                        </footer>
                        </blockquote>     
                        <br/> 
                        <p>{user_likes.length}</p>{" "}
                        <Button variant="primary" onClick={handleLike}>{this.props.liked ? `UNLIKE` : `LIKE`}</Button>{" "}
                        <Button variant="primary" onClick={() => this.props.handleHomeRender("Check in", id)}>Edit</Button>{" "}
                        {this.props.user.id === user_id ?  
                        <Button onClick={()=> this.props.deleteBlog(id)} variant="primary">Delete</Button> : null}
                    </Card.Body> 
                    
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Button variant="primary">Comment</Button>
                        <br/>
                    </Form>
                  
                </Card>
                
            </div>
        );
    }
}

export default connect(state =>({user: state.user}), {deleteBlog, likeBlog, unlikeBlog})(BlogCard);
