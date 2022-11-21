import axios from 'axios';
import * as getCompletedAction from './actions';

const completedTaskFail = (err) => {
    return {
        type : getCompletedAction.GET_ALL_COMPLETED_TASKS_FAILED,
        payload : err.message
    }
}

const completedTaskReq = () => {
    return {
        type : getCompletedAction.GET_ALL_COMPLETED_TASKS_REQ
    }
}

const completedTaskSucc = (task) => {
    return {
        type : getCompletedAction.GET_ALL_COMPLETED_TASKS_SUCCESS,
        payload : task
    }
}

export const getCompletedTask = () => {

    return async function(dispatch, getState) {

        dispatch(completedTaskReq());
    
        try {
            const response = await axios.get('http://127.0.0.1:8000/completed');
            const data = response.data.data;
            
            data.map((task) => {
                let completeDate = task.created_date;
                let date = completeDate.split('T');
                task.created_date = date[0];
            })        
            
            dispatch(completedTaskSucc(data))
            
        } catch (error) {
            console.log(error.message);
            dispatch(completedTaskFail(error));
        }
    }
}