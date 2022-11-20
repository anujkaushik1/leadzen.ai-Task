import * as getTaskActions from '../actions/actions';
import initalState from './initialState.json';

const getTasksReducer = (state = initalState, action) => {

    switch(action.type){
       case getTaskActions.GET_ALL_COMPLETED_TASKS_SUCCESS:
        return {
            ...state,
            error : "",
            task : action.payload
        }

        case getTaskActions.GET_ALL_COMPLETED_TASKS_FAILED:
            return {
                ...state,
                error : action.payload
            }
            
        default :
            return state;
    }
}

export default getTasksReducer;