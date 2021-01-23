import React from 'react';
import { Card } from 'react-bootstrap'

const TaskCard = ({task}) => {
    return (
        <div >
            <Card  id="task-card" style={{ width: '16rem' }}>
                <Card.Body id="task">
                    <Card.Title>{task.name}</Card.Title>
                </Card.Body>
            </Card>
        </div>
    );
}

export default TaskCard;
