import { adsReducer } from "./ads/ads";
import { feedAllReducer } from "./feedAll/feedAll";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  feedAll: feedAllReducer,
  ads: adsReducer,
});

export default rootReducer;
