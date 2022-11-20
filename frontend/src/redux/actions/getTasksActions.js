import * as getTaskActions from './actions';

const allTasksFail = (err) => {
    return {
        type : getTaskActions.GET_ALL_COMPLETED_TASKS_FAILED,
        payload : err.message
    }
}

const allTasksSucc = (task) => {
    return {
        type : getTaskActions.GET_ALL_COMPLETED_TASKS_SUCCESS,
        payload : task
    }
}

export const getTasks = () => {

    return async(dispatch, getState) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000');
            const data = response.data.data;

            dispatch(allTasksSucc(data))
            
        } catch (error) {
            console.log(err.message);
            dispatch(allTasksFail(err));
        }
    }
}