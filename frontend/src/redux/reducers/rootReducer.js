import { combineReducers } from "redux";
import getTasksReducer from "./getTasksReducer";
import getPendingTasksReducer from "./getPendingTaskReducer";



const rootReducer = combineReducers({
    getTasks : getTasksReducer,
    getPendingTasks : getPendingTasksReducer,
})

export default rootReducer;