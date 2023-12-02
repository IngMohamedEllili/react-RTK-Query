import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { albumApi } from "./apis/albumApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumApi.reducerPath]: (albumApi.reducer),
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(albumApi.middleware)
  }
})
setupListeners(store.dispatch)

export * from './thunk'
export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } from './apis/albumApi' 