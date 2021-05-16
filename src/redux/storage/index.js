import { adsReducer } from "./ads/ads";
import { feedAllReducer } from "./feedAll/feedAll";
import { feedDetailReducer } from "./feedDetail/feedDetail";
import { feedOptionReducer } from "./feedOption/feedOption";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  feedAll: feedAllReducer,
  ads: adsReducer,
  feedDetail: feedDetailReducer,
  feedOption: feedOptionReducer,
});

export default rootReducer;
