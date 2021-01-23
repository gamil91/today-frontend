import React from 'react';
import { Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt} from "@fortawesome/free-solid-svg-icons";



const TaskCard = ({task, editTask, deleteTask}) => {
    return (
        <div >
            <div id="task-card" style={{ width: '22.5rem' }}>
                    <div id="task-icons">
                    <Dropdown id="task-dropdown">
                        <Dropdown.Toggle/>
                        <Dropdown.Menu>

                        <Dropdown.Item  
                            onClick={() => editTask(task)}>
                            <i><FontAwesomeIcon  
                                icon={faPencilAlt} size="1x" className="icon" /></i>{" "}Edit
                        </Dropdown.Item>

                        <Dropdown.Item 
                            onClick={() => deleteTask(task)}>
                            <i><FontAwesomeIcon  icon={faTrashAlt} size="1x" className="icon" /></i>{" "}Delete
                        </Dropdown.Item>
                   
                    </Dropdown.Menu>
                    </Dropdown>
                    </div>
                     
               
                    <input className="todo-item-checkbox" type="checkbox"></input>{" "}{task.name}
                    
            </div>
        </div>
    );
}

export default TaskCard;