import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get('http://localhost:3005/users')
  await pause(5000)
  return response.data
})

// DEV Only!!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    console.log("🚀 ~ file: fetchUsers.js:13 ~ returnnewPromise ~ resolve:", resolve)
    setTimeout(resolve, duration)
  })
}
export { fetchUsers }