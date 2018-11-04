import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers } from "redux";
import { compose } from "redux";
import { Provider } from "react-redux";
import authorReducer from "./store/reducers/author";
import authorsReducer from "./store/reducers/authors";
import App from "./App";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  rootauthors: authorsReducer,
  rootauthor: authorReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const centralStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={centralStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();
