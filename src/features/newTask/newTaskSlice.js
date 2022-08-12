/*********************************************/
/* Reducer for slice of state                */
/*********************************************/

const initialNewTask = "";

export function newTaskReducer(newTask = initialNewTask, action) {
    switch (action.type) {
        case 'newTask/changeNewTaskValue':
            return action.payload;
        case 'tasks/addNewTask':
            return '';
        default:
            return newTask;
    }
}

/*********************************************/
/* Selector functions for slice state        */
/*********************************************/

export function selectNewTask(state) {
    return state.newTask;
}

/*********************************************/
/* Action Creators functions                 */
/*********************************************/

export function changeNewTaskValue(newValue) {
    return {
        type: 'newTask/changeNewTaskValue',
        payload: newValue
    };
}