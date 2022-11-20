import * as addTaskAction from '../actions/actions';
import initalState from './initialState.json';

const addTaskReducer = (state = initalState.addtask, action) => {

    switch(action.type){

        case addTaskAction.ADD_TASK_REQUEST:
            return {
                ...state,
                loading : true,
            }

        case addTaskAction.ADD_TASK_SUCCESS:
            return {
                ...state,
                loading : false,
                task : action.payload
            }

        case addTaskAction.ADD_TASK_FAILED:
            return {
                ...state,
                loading : false,
                error : action.payload
            }

        case addTaskAction.REMOVE_ERROR:
            return {
                ...state,
                loading : false,
                error : ''  
            }

        default :
            return state;

    }

}

export default addTaskReducer;