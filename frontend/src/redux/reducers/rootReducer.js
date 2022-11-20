import { combineReducers } from "redux";
import getTasksReducer from "./getTasksReducer";


const rootReducer = combineReducers({
    getTasks : getTasksReducer
})

export default rootReducer;