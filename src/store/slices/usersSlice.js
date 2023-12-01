import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunk/fetchUsers";
import { addUser } from "../thunk/addUser";
import { deleteUser } from "../thunk";

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    isLoading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
    })
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.data.push(action.payload)
    })
    builder.addCase(addUser.rejected, (state, action) => {
      state.error = action.error
      state.isLoading = false
    })
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = state.data.filter((user) => {
        return user.id !== action.payload.id
      })
    })
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.error = action.error
      state.isLoading = false
    })
  }
})

export const usersReducer = usersSlice.reducer