import React, { useState } from "react";
import Task from "../Task/Task";
import './AppContainer.css';
import Header from "../Header/Header";
import NewTask from "../NewTask/NewTask";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";

function AppContainer() {
    // Array 'tasks' store all tasks in the list
    const [tasks, setTasks] = useState([{taskid: '1', title: "Task number 1", isDone: false}, {taskid: '2', title: 'Task number 2', isDone: true}]);
    // String 'newTask' hold a current value of the input in NewTask component
    const [newTask, setNewTask] = useState("");
    // String 'selectedFilter' hold a current Filter: filter-all, filter-active, filter-completed
    const [selectedFilter, setSelectedFilter] = useState('filter-all');

    const handleSubmit = function(e) {
        e.preventDefault();
        console.log(e);
        setTasks( prev => ([...prev, {taskid: uuidv4(), title: newTask, isDone: false}]));
        setNewTask("");
    };

    const handleChangeNewTask = function (e) {
        setNewTask(e.target.value);
    };

    const handleChangeIsDone = function (e) {
        // Search for task object with taskid == e.target.dataset.taskid
        let index = tasks.findIndex( item => item.taskid === e.target.dataset.taskid );
        if (index === undefined) return;

        // Changing isDone status for the task in tasks
        setTasks( prev => {
            let next = prev.slice(); // We must return a new copy of the prev array for setTasks
            next[index].isDone = e.target.checked;
            return next;
        });
    };

    const handleChangeFilter = function(e) {
        setSelectedFilter(e.target.value);
    };

    const uuidv4 = function() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    };

    return (
        <main className='app-container'>
            <div className='app-container__main-part'>
                <Header />
                <NewTask text={newTask} onSubmit={handleSubmit} onChange={handleChangeNewTask} />
                <TaskList tasks={tasks} selectedFilter={selectedFilter} onChange={handleChangeIsDone} />
            </div>
            <Footer selectedFilter={selectedFilter} onChangeFilter={handleChangeFilter} />
        </main>
    );
}

export default AppContainer;