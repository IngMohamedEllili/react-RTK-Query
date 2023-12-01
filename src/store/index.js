import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer
  }
})

export * from './thunk/fetchUsers'
export * from './thunk/addUser'