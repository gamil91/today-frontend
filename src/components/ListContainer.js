import React, { Component } from 'react';
import { DragDropContext, Droppable} from "react-beautiful-dnd"
//css
import { Button, Form } from 'react-bootstrap'
import '../css/ListContainer.css'
//redux
import { connect } from 'react-redux';
import { addList, deleteList, updateList, reorderList } from '../redux/actions/listsActions'
//components
import ListCard from './ListCard'


class ListContainer extends Component {

    constructor(props){
        super(props)
        this.listRef = React.createRef()
    }
    

    state = {
        openForm: false,
        title: "",
        id: ""
    }

    handleClick = () => {
        this.setState(prevState => {
            return ({openForm: !prevState.openForm})
        })
        this.listRef.current.focus();
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

        fetch(`https://today-api.herokuapp.com/updateorder`, config)
        .then(res => res.json())
    }

    
    listDatabase = () => {
        let info = {lists_array: this.props.lists.map(list => list.id)}
        let config = {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(info)}
        fetch(`https://today-api.herokuapp.com/updatelistsorder`, config)
        .then(res => res.json())
    }


    render() {
        
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                    <div id="create-list">
                    {this.state.openForm ? null : <Button variant="secondary"  onClick={this.handleClick}> Create List</Button> }
                    <br/><br/>

                    {this.state.openForm ? 
                    <Form id="list-form" onSubmit={this.handleSubmit}>
                        <Form.Group >
                            <Form.Control ref={this.listRef} type="text" placeholder="Get em done!" name="title" value={this.state.title} onChange={this.handleChange}/>
                        </Form.Group>
                    </Form> : null}
                      
                    </div>
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
