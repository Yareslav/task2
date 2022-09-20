import { configureStore, combineReducers } from "@reduxjs/toolkit";
import notesReducer from "../redux/reducers/notesReducer";

const mainReducer = combineReducers({ notesReducer });

const store = configureStore({
  reducer: mainReducer,
});

type AppState = typeof store;
export type StoreDispatch = AppState["dispatch"];
export type StoreState = ReturnType<typeof mainReducer>;

export default store;
