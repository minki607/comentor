import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./storage";

/* ------------------------------- 미들웨어 ------------------------------ */

const middlewares = [thunk, logger];

/* ---------------------------------- 스토어 --------------------------------- */

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

/* ------------------------ 스토어 공급자 ------------------------ */

export const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
