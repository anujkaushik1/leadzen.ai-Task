import * as getCompltedAction from '../actions/actions';
import initalState from './initialState.json';

const getCompletedReducer = (state = initalState, action) => {

    switch(action.type){
       
       case getCompltedAction.GET_ALL_COMPLETED_TASKS_REQ:
         return {
            ...state,
            loading : true,
            tasks : []
         }

       case getCompltedAction.GET_ALL_COMPLETED_TASKS_SUCCESS:
        return {
            ...state,
            loading : false,
            error : "",
            tasks : action.payload
        }

        case getCompltedAction.GET_ALL_COMPLETED_TASKS_FAILED:
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

export default getCompletedReducer;