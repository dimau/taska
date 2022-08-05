import React from "react";
import './NewTask.css';

function NewTask(props) {

    const handleSubmit = function(e) {
        e.preventDefault();
        props.addNewTask();
    }

    const handleChange = function(e) {
       props.changeNewTaskValue(e.target.value);
    }

    return (
        <form className='new-task' onSubmit={handleSubmit}>
            <input
                type='text'
                className='new-task__input'
                placeholder='Add New'
                value={props.text}
                onChange={handleChange}
                autoFocus
            />
        </form>
    );
}

export default NewTask;