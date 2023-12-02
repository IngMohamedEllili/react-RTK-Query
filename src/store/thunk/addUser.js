import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from '@faker-js/faker'
import { pause } from "../../utils";

export const addUser = createAsyncThunk('user/add', async () => {
  const response = await axios.post('http://localhost:3005/users', { name: faker.person.fullName() })
  await pause(1000)
  return response.data
})

