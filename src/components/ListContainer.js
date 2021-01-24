import React, { Component } from 'react';

import { Button, Form } from 'react-bootstrap'
import '../css/ListContainer.css'

import { connect } from 'react-redux';
import { addList, deleteList, updateList } from '../redux/actions/listsActions'

import ListCard from './ListCard'



class ListContainer extends Component {


    state = {
        openForm: false,
        title: "",
        id: ""
    }

    handleClick = () => {
        this.setState(prevState => {
            return ({openForm: !prevState.openForm})
        })
    }

    handleChange = (e) => {
        this.setState({title:e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        !!this.state.id ? this.props.updateList(this.state) : this.props.addList(this.state.title)
        this.setState({openForm: false, title: "", id: ""})
    }
    
    handleUpdate = (list) => {
        this.setState({openForm: true, title: list.title, id: list.id})
    }

    

    render() {
        // debugger
        // console.log(this.props.lists)
        return (
            <div>
                <Button variant="secondary" onClick={this.handleClick}> Create a new List</Button>
                <br/><br/>

                {this.state.openForm ? 
                <Form id="list-form" onSubmit={this.handleSubmit}>
                    <Form.Group >
                        <Form.Control type="text" placeholder="Get done today" name="title" value={this.state.title} onChange={this.handleChange}/>
                    </Form.Group>
                </Form> : null}

                <div className="lists">
                    {this.props.lists.map(list =>
                        <ListCard key={list.id} list={list} editList={this.handleUpdate} deleteList={this.props.deleteList}/>)}
                </div>
            </div>
        );
    }
}


export default connect(state => ({lists: state.lists}), {addList, deleteList, updateList})(ListContainer);
