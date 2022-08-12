/*********************************************/
/* Reducer for slice of state                */
/*********************************************/

const initialFilter = "filter-all";

export function filterReducer(filter = initialFilter, action) {
    switch (action.type) {
        case 'filter/changeCurrentFilter':
            return action.payload;
        default:
            return filter;
    }
}

/*********************************************/
/* Selector functions for slice state        */
/*********************************************/

export function selectCurrentFilter(state) {
    return state.selectedFilter;
}

/*********************************************/
/* Action Creators functions                 */
/*********************************************/

export function changeCurrentFilter(newFilterValue) {
    return {
        type: 'filter/changeCurrentFilter',
        payload: newFilterValue
    };
}