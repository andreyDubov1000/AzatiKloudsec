import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const customWindow: any = window;
let devTools = undefined;

if (
  process.env.NODE_ENV !== "production" &&
  customWindow?.__REDUX_DEVTOOLS_EXTENSION__
) {
  devTools = customWindow.__REDUX_DEVTOOLS_EXTENSION__();
}

const reduxStore = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch;

export default reduxStore;
