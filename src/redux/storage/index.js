import { feedAllReducer } from "./feedAll/feedAll";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  feedAll: feedAllReducer,
});

export default rootReducer;
