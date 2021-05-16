import { adsReducer } from "./ads/ads";
import { feedAllReducer } from "./feedAll/feedAll";
import { feedDetailReducer } from "./feedDetail/feedDetail";
import { optionReducer } from "./option/option";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  feedAll: feedAllReducer,
  ads: adsReducer,
  feedDetail: feedDetailReducer,
  option: optionReducer,
});

export default rootReducer;
