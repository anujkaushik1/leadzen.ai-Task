import { combineReducers } from "redux";
import addTaskReducer from "./addTaskReducer";

const rootReducer = combineReducers({
    addTask : addTaskReducer
})

export default rootReducer;