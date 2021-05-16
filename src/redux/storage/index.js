import { adsReducer } from "./ads/ads";
import { feedAllReducer } from "./feedAll/feedAll";
import { feedDetailReducer } from "./feedDetail/feedDetail";
import { feedOptionReducer } from "./feedOption/feedOption";
import { feedCategoryReducer } from "./feedCategory/feedCategory";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  feedAll: feedAllReducer,
  ads: adsReducer,
  feedDetail: feedDetailReducer,
  feedOption: feedOptionReducer,
  feedCategory: feedCategoryReducer,
});

export default rootReducer;
