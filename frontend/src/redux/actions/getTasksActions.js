import axios from 'axios';
import * as getTaskActions from './actions';

const allTasksFail = (err) => {
    return {
        type : getTaskActions.GET_ALL_TASKS_FAILED,
        payload : err.message
    }
}

const allTasksReq = () => {
    return {
        type : getTaskActions.GET_ALL_TASKS_REQ
    }
}

const allTasksSucc = (task) => {
    return {
        type : getTaskActions.GET_ALL_TASKS_SUCCESS,
        payload : task
    }
}

export const getTasks = () => {

    return async function(dispatch, getState) {

        dispatch(allTasksReq());
    
        try {
            const response = await axios.get('http://127.0.0.1:8000');
            const data = response.data.data;

            data.map((task) => {
                let completeDate = task.created_date;
                let date = completeDate.split('T');
                task.created_date = date[0];
            })        
            
            dispatch(allTasksSucc(data))
            
        } catch (error) {
            console.log(error.message);
            dispatch(allTasksFail(error));
        }
    }
}