/*********************************************/
/* Reducer for slice of state                */
/*********************************************/

const initialTasks = [
    {taskid: '1', title: "Купить бэху и гонять на ней как фрайер по Кипру", isDone: false},
    {taskid: '2', title: 'Свалить из Рашки в Армяшку', isDone: false}, 
    {taskid: '3', title: 'Сделано уже нах', isDone: true}
];

export function tasksReducer(tasks = initialTasks, action) {
    switch (action.type) {
        case 'tasks/addNewTask':
            if (action.payload === "") return tasks;
            return [...tasks, {taskid: uuidv4(), title: action.payload, isDone: false}];
        case 'tasks/deleteTask':
            return getTasksWithoutDeletedTask(tasks, action.payload);
        case 'tasks/toggleTaskIsDone':
            return getTasksWithToggledTaskIsDone(tasks, action.taskID, action.isDoneNewValue);
        default:
            return tasks;
    }
}

/*********************************************/
/* Selector functions for slice state        */
/*********************************************/

export function selectAllTasks(state) {
    return state.tasks;
}

export function selectAllFilteredTasks(state, filter) {
    const allTasks = selectAllTasks(state);
    return allTasks.filter( task => checkSelection(filter, task.isDone));
}

/*********************************************/
/* Action Creators functions                 */
/*********************************************/

export function addNewTask(newTaskTitle) {
    return {
        type: 'tasks/addNewTask',
        payload: newTaskTitle
    };
}

export function deleteTask(taskID) {
    return {
        type: 'tasks/deleteTask',
        payload: taskID
    };
}

export function toggleTaskIsDone(taskID, isDoneNewValue) {
    return {
        type: 'tasks/toggleTaskIsDone',
        taskID: taskID,
        isDoneNewValue: isDoneNewValue
    };
}

/*********************************************/
/* Utilities                                 */
/*********************************************/

// const addNewTask = function() {
//     if (newTask === '') return
//     setTasks( prev => ([...prev, {taskid: uuidv4(), title: newTask, isDone: false}]));
//     setNewTask("");
// };

const getTasksWithoutDeletedTask = function(tasks, taskid) {
    // Search for task object with taskid
    let index = tasks.findIndex( item => item.taskid === taskid );
    if (index === undefined) return tasks;

    // Delete the task from tasks
    let next = tasks.slice(); // We must return a new copy of the tasks array for reducer function
    next.splice(index, 1);
    return next;
}

/**
 * 
 * @param {array} tasks 
 * @param {string} taskid 
 * @param {bool} isDoneNewValue 
 * @returns {array}
 */
const getTasksWithToggledTaskIsDone = function (tasks, taskid, isDoneNewValue) {
    let index = tasks.findIndex( item => item.taskid === taskid );
    if (index === undefined) return tasks;

    // Changing isDone status for the task in tasks
    let next = tasks.slice(); // We must return a new copy of the tasks array for reducer function
    next[index].isDone = isDoneNewValue;
    return next;
};

/**
 * 
 * @param {string} selectedFilter 
 * @param {boolean} taskStatus 
 * @returns true, if task status is matched with filter and false, if task status is not matched
 */
const checkSelection = function(selectedFilter, taskStatus) {
    return (selectedFilter === 'filter-all') ||
           (selectedFilter === 'filter-active' && taskStatus === false) ||
           (selectedFilter === 'filter-completed' && taskStatus === true);
}

const uuidv4 = function() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
};