import * as getTaskActions from '../actions/actions';
import initalState from './initialState.json';

const getTasksReducer = (state = initalState, action) => {

    switch(action.type){
       
       case getTaskActions.GET_ALL_TASKS_REQ:
         return {
            ...state,
            loading : true,
            tasks : []
         }

       case getTaskActions.GET_ALL_COMPLETED_TASKS_SUCCESS:
        return {
            ...state,
            loading : false,
            error : "",
            tasks : action.payload
        }

        case getTaskActions.GET_ALL_COMPLETED_TASKS_FAILED:
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

export default getTasksReducer;