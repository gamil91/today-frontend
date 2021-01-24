import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt} from "@fortawesome/free-solid-svg-icons";



class TaskCard extends Component  {


    state = {
        finished: this.props.task.finished
    }

    handleEdit = () => {
        let data = {
            name : this.props.task.name,
            finished : this.state.finished,
            id : this.props.task.id
        }
        this.props.editTask(data)
    }

    handleChange = () => {
        this.setState(prevState => {return{finished: !prevState.finished}}, () => {
            let dataDone = {
                taskName : this.props.task.name,
                finished : this.state.finished,
                taskId : this.props.task.id
            }
            this.props.updateTask(dataDone)
        })
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
                     
                
                    {this.state.finished ? 
                    <div >
                        <input onChange={this.handleChange} className="todo-item-checkbox" type="checkbox"></input>{" "}{" "}
                        <span id="finished-task">{this.props.task.name}</span>
                    </div> : 
                    <div >
                        <input onChange={this.handleChange} className="todo-item-checkbox" type="checkbox"></input>{" "}{" "}
                        {this.props.task.name}
                    </div>}
                   
            </div>
        </div>
    );}
}

export default TaskCard;