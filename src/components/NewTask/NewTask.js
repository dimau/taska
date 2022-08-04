import React from "react";
import './NewTask.css';

function NewTask(props) {
    return (
        <form className='new-task' onSubmit={props.onSubmit}>
            <input type='text' className='new-task__input' placeholder='Add New' value={props.text} onChange={props.onChange} autoFocus />
        </form>
    );
}

export default NewTask;