// Modules/Libraries
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";

// Reducers
import auth from "./auth";
import users from "./users";
import issue from "./issue";
import chore from "./chore";
import history from "./history";
import tickets from "./tickets";
import projects from "./project";
import myTickets from "./myTickets";
import companyUsers from "./companyUsers";
import notifications from "./notifications";
import fliedAttributes from "./fliedAttributes";

const reducer = combineReducers({
  auth,
  users,
  chore,
  issue,
  tickets,
  projects,
  myTickets,
  companyUsers,
  notifications,
  fliedAttributes,
  ticketHistory: history,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
