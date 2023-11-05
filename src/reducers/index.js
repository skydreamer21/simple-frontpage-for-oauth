import { combineReducers } from "redux";
import { memberReducer } from "./memberReducer";

const rootReducer = combineReducers({
    memberReducer,
});

export default rootReducer;
