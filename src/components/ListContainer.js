import React, { Component } from 'react';

import { Button, Form } from 'react-bootstrap'
import '../css/ListContainer.css'

import { connect } from 'react-redux';
import { addList, deleteList, updateList, reorderList } from '../redux/actions/listsActions'

import ListCard from './ListCard'

import { DragDropContext, Droppable} from "react-beautiful-dnd"


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

    onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result
        
        if(!destination) { return } 
       
        this.props.reorderList(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index,
            draggableId,
            type )

        if (type === "list"){
            setTimeout(this.listDatabase, 2000)}
        else if (source.droppableId !== destination.droppableId) {
            this.updateDatabase(destination.droppableId, draggableId)}
        else {
            this.updateDatabase(destination.droppableId)}
    }

    updateDatabase = (list_id, moveToNewList="") => {
        let newTasksOrder = this.props.lists.find(list => list.id === parseInt(list_id)).tasks.map(task => task.id)

        let info
        moveToNewList !== "" ? 
        info = {tasks_array: newTasksOrder, list_id: list_id}:
        info = {tasks_array: newTasksOrder}

        let config = {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(info)}

        fetch(`http://localhost:3000/updateorder`, config)
        .then(res => res.json())
    }

    
    listDatabase = () => {
        let info = {lists_array: this.props.lists.map(list => list.id)}
        let config = {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(info)}
        fetch(`http://localhost:3000/updatelistsorder`, config)
        .then(res => res.json())
    }

    render() {
        // console.log(this.props.lists)
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                
                    <Button variant="secondary"  onClick={this.handleClick}> Create List</Button>
                    <br/><br/>

                    {this.state.openForm ? 
                    <Form id="list-form" onSubmit={this.handleSubmit}>
                        <Form.Group >
                            <Form.Control type="text" placeholder="Get done today" name="title" value={this.state.title} onChange={this.handleChange}/>
                        </Form.Group>
                    </Form> : null}

                    <Droppable droppableId="all-lists" direction="horizontal" type="list">  
                        {(provided => 
                        <div className="lists" {...provided.droppableProps} ref={provided.innerRef}>
                            {this.props.lists.map((list, idx) =>
                                <ListCard 
                                    id={list.id} idx={idx}
                                    key={list.id} list={list} 
                                    editList={this.handleUpdate} 
                                    deleteList={this.props.deleteList}/>)}
                            {provided.placeholder}
                        </div>
                        )}

                    </Droppable>
                
            </DragDropContext>
        );
    }
}


export default connect(state => ({lists: state.lists}), {addList, deleteList, updateList, reorderList})(ListContainer);
