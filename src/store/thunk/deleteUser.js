import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pause } from "../../utils";

export const deleteUser = createAsyncThunk('user/delete', async (user) => {
  await axios.delete(`http://localhost:3005/users/${user.id}`)
  await pause(1000)
  return user
})
