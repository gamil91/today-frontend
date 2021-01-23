import React, { Component } from 'react';

import { Card, Dropdown, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt} from "@fortawesome/free-solid-svg-icons";

import { connect } from 'react-redux';
import { addTask } from '../redux/actions/tasksActions'

import TaskCard from './TaskCard'
import DeleteModal from './DeleteModal'

class ListCard extends Component  {
    // debugger
    state = {
        modalDelete: false,
        openDeleteModal: false,
        taskName: "",
        finished: false,
        id: "",
        taskId: ""
    }

    handleDeleteList = () => {
        this.closeModal()
        this.props.deleteList(this.props.list.id)
    }

    openModal = () => {this.setState({ openDeleteModal: true, modalDelete: true})}
    closeModal = () => this.setState({ openDeleteModal: false });

    handleChange = (e) => {
        this.setState({taskName: e.target.value, id: this.props.list.id})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addTask(this.state)
        this.setState({taskName: "", taskId: ""})
    }

    editTask = (data) => {
        this.setState({taskName: data.name, finished: data.finished, taskId: data.id})
    }

    deleteTask = () => {

    }

    handleFinish = () => {

    }


    render (){
        return (
        <div>
        <Card id="list-card" style={{ width: '25rem' }}>

            <div id="list-icons">
                <Dropdown >
                    <Dropdown.Toggle/>
                    <Dropdown.Menu>

                    <Dropdown.Item  
                        onClick={() => this.props.editList(this.props.list)}>
                        <i><FontAwesomeIcon  
                            icon={faPencilAlt} size="1x" className="icon" /></i>{" "}Edit
                    </Dropdown.Item>

                    <Dropdown.Item 
                        onClick={() => this.openModal()}>
                        <i><FontAwesomeIcon  icon={faTrashAlt} size="1x" className="icon" /></i>{" "}Delete
                    </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
            </div>
            
            <Card.Body id="card-body-title"> 
                <Card.Title id="list-title">{this.props.list.title}</Card.Title>
                
            </Card.Body>

            <Card.Footer className="text-muted">
            <Form  onSubmit={this.handleSubmit}>
                    <Form.Group >
                        <Form.Control className="task-form" type="text" placeholder="Add task" name="title" value={this.state.taskName} onChange={this.handleChange}/>
                    </Form.Group>
            </Form> 
            </Card.Footer>
            
            <div className="tasks-cards">
                {this.props.list.tasks.map(task => 
                    <TaskCard 
                        // finished={this.state.finished}
                        editTask={this.editTask} 
                        deleteTask={this.deleteTask} 
                        key={task.id} task={task}/>)}
            </div>

            
        </Card>

        { this.state.modalDelete ?
            <DeleteModal
                listDelete={true}
                closeModal={this.closeModal}
                openModal={this.state.openDeleteModal}
                handleDelete={this.handleDeleteList}/> : null }

        </div>
    );}
}

export default connect(null, { addTask })(ListCard);
