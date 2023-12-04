import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { albumApi } from "./apis/albumApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { photoApi } from "./apis/photoApi";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumApi.reducerPath]: (albumApi.reducer),
    [photoApi.reducerPath]: (photoApi.reducer)
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([albumApi.middleware, photoApi.middleware])
  }
})

setupListeners(store.dispatch)

export * from './thunk'
export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } from './apis/albumApi'
export { useAddPhotoMutation, useFetchPhotosQuery, useRemovePhotoMutation } from './apis/photoApi'