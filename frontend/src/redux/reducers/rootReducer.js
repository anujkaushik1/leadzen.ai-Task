import { combineReducers } from "redux";
import getTasksReducer from "./getTasksReducer";
import getPendingTasksReducer from "./getPendingTaskReducer";
import getCompletedReducer from "./getCompletedReducer";



const rootReducer = combineReducers({
    getTasks : getTasksReducer,
    getPendingTasks : getPendingTasksReducer,
    getCompletedTasks : getCompletedReducer
})

export default rootReducer;