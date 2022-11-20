import * as addTaskAction from './actions';

// Add Task Creator Function

const addTaskReq = () => {
    return {
        type : addTaskAction.ADD_TASK_REQUEST
    }
}

const addTaskFail = (err) => {
    return {
        type : addTaskAction.ADD_TASK_FAILED,
        payload : err.message
    }
}

const addTaskSucc = () => {
    return {
        type : addTaskAction.ADD_TASK_SUCCESS
    }
}

const removeError = () => {
    return {
        type : addTaskAction.REMOVE_ERROR
    }
}
