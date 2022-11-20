import axios from 'axios';
import * as deleteTaskAction from './actions';

const deleteTaskFail = (err) => {
    return {
        type : deleteTaskAction.DELETE_TASK_FAILED,
        payload : err.message
    }
}

const deleteTaskReq = () => {
    return {
        type : deleteTaskAction.DELETE_TASK_REQ
    }
}

const deleteTaskSucc = () => {
    return {
        type : deleteTaskAction.DELETE_TASK_SUCCESS,
    }
}

export const deleteTask = (id) => {

    return async function(dispatch, getState) {

        dispatch(deleteTaskReq());
    
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/${id}`);
            
            dispatch(deleteTaskSucc)
            
        } catch (error) {
            console.log(error.message);
            dispatch(pendingTaskFail(error));
        }
    }
}