import axios from 'axios';
import * as getPendingTasksAction from './actions';

const pendingTaskFail = (err) => {
    return {
        type : getPendingTasksAction.GET_ALL_PENDING_TASKS_FAILED,
        payload : err.message
    }
}

const pendingTaskReq = () => {
    return {
        type : getPendingTasksAction.GET_ALL_PENDING_TASKS_REQ
    }
}

const pendingTaskSucc = (task) => {
    return {
        type : getPendingTasksAction.GET_ALL_PENDING_TASKS_SUCCESS,
        payload : task
    }
}

export const getPendingTasks = () => {

    return async function(dispatch, getState) {

        dispatch(pendingTaskReq());
    
        try {
            const response = await axios.get('http://127.0.0.1:8000/pending');
            const data = response.data.data;

            data.map((task) => {
                let completeDate = task.created_date;
                let date = completeDate.split('T');
                task.created_date = date[0];
            })        
            
            
            dispatch(pendingTaskSucc(data))
            
        } catch (error) {
            console.log(error.message);
            dispatch(pendingTaskFail(error));
        }
    }
}