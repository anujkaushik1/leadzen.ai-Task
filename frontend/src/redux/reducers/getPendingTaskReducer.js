import * as getPendingTasksAction from '../actions/actions';
import initalState from './initialState.json';

const getPendingTasksReducer = (state = initalState, action) => {

    switch(action.type){
       
       case getPendingTasksAction.GET_ALL_PENDING_TASKS_REQ:
         return {
            ...state,
            loading : true,
            tasks : []
         }

       case getPendingTasksAction.GET_ALL_PENDING_TASKS_SUCCESS:
        return {
            ...state,
            loading : false,
            error : "",
            tasks : action.payload
        }

        case getPendingTasksAction.GET_ALL_PENDING_TASKS_FAILED:
            return {
                ...state,
                loading : false,
                error : action.payload,
                tasks : []
            }

        default :
            return state;
    }
}

export default getPendingTasksReducer;