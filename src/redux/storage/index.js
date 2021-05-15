import { adsReducer } from "./ads/ads";
import { feedAllReducer } from "./feedAll/feedAll";
import { feedDetailReducer } from "./feedDetail/feedDetail";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  feedAll: feedAllReducer,
  ads: adsReducer,
  feedDetail: feedDetailReducer,
});

export default rootReducer;
