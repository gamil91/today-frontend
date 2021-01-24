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
        
        if(!destination) {
            return;
        } 

        this.props.reorderList(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index,
            draggableId,
            type )
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                
                    <Button variant="secondary" onClick={this.handleClick}> Create a new List</Button>
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
