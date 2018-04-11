import {createStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {autoRehydrate, persistStore} from "redux-persist";
import rootReducer from "./reducers";

// Custom Logging middleware
const logger = store => next => action => {
  // console.log("dispatching", action);
  let result = next(action);
  // console.log("next state", store.getState());
  return result;
};

// ==================================== ==================
// Middleware Configuration
// ======================================================

const initialState = {};
const devtools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const middleware = [thunk, logger];
// const enhancers = compose(applyMiddleware(...middleware), devtools);

// enable redux devtools... can this be done with Webpack instead?
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  applyMiddleware(...middleware),
  autoRehydrate()
);

export default initialState => {
  const store = createStore(rootReducer, initialState, enhancers);
  persistStore(store, {blacklist: "form"});
  return store;
};
