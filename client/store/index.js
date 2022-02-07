import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import projects from "./project";
import users from "./users";
import issue from "./issue";
import fliedAttributes from "./fliedAttributes";

const reducer = combineReducers({
  auth,
  projects,
  users,
  issue,
  fliedAttributes,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
