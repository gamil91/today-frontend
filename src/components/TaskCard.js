import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt} from "@fortawesome/free-solid-svg-icons";



class TaskCard extends Component  {


    state = {
        finished : false
    }

    handleEdit = () => {
        let data = {
            name : this.props.task.name,
            finished : this.state.finished,
            id : this.props.task.id
        }
        this.props.editTask(data)
    }

    render(){

        return (
        <div >
            <div id="task-card" style={{ width: '22.5rem' }}>
                    <div id="task-icons">
                    <Dropdown id="task-dropdown">
                        <Dropdown.Toggle/>
                        <Dropdown.Menu>

                        <Dropdown.Item  
                            onClick={this.handleEdit}>
                            <i><FontAwesomeIcon  
                                icon={faPencilAlt} size="1x" className="icon" /></i>{" "}Edit
                        </Dropdown.Item>

                        <Dropdown.Item 
                            onClick={() => this.props.deleteTask(this.props.task.id)}>
                            <i><FontAwesomeIcon  icon={faTrashAlt} size="1x" className="icon" /></i>{" "}Delete
                        </Dropdown.Item>
                   
                    </Dropdown.Menu>
                    </Dropdown>
                    </div>
                     
               
                    <input onChange={() => {this.setState(prevState => {return{finished: !prevState.finished}})}} className="todo-item-checkbox" type="checkbox"></input>{" "}
                    {this.state.finished ? <div id="finished-task">{this.props.task.name}</div> : <div >{this.props.task.name}</div>}
                    
            </div>
        </div>
    );}
}

export default TaskCard;