import React, { Component } from 'react';

import { Card, Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt} from "@fortawesome/free-solid-svg-icons";

import TaskCard from './TaskCard'
import DeleteModal from './DeleteModal'

class ListCard extends Component  {
    // debugger
    state = {
        modalDelete: false,
        openDeleteModal: false
    }

    handleDelete = () => {
        this.closeModal()
        this.props.deleteList(this.props.list.id)
    }

    openModal = () => {this.setState({ openDeleteModal: true, modalDelete: true})}
    closeModal = () => this.setState({ openDeleteModal: false });

    render (){return (
        <div>
        <Card id="list-card" style={{ width: '18rem' }}>

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
            <div className="tasks-cards">
                {this.props.list.tasks.map(task => <TaskCard key={task.id} task={task}/>)}
            </div>

            <Form id="list-form" onSubmit={this.handleSubmit}>
                    <Form.Group >
                        <Form.Control type="text" placeholder="Get done today" name="title" value={this.state.title} onChange={this.handleChange}/>
                    </Form.Group>
                </Form> 
        </Card>

        { this.state.modalDelete ?
            <DeleteModal
                listDelete={true}
                closeModal={this.closeModal}
                openModal={this.state.openDeleteModal}
                handleDelete={this.handleDelete}/> : null }


        </div>
    );}
}

export default ListCard;
