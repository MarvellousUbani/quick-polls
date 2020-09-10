import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import users from "./user/user.reducer";
import authedUser from "./authedUser/authedUser.reducer";
import polls from "./poll/poll.reducer";
import { loadingBarReducer } from "react-redux-loading";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["polls", "users", "authedUser"],
};

const rootReducer = combineReducers({
  users,
  authedUser,
  polls,
  loadingBar: loadingBarReducer,
});

export default persistReducer(persistConfig, rootReducer);
