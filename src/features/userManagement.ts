import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../models/models";

// Define the initial state using that type
const initialState: User = {
  EmailAddress: "my email",
  Password: "12334456",
  Name: "siyabonga",
  Surname: "",
  Cellnumber: "067 698 4906",
  shoppingLists : []
};

export const login = createAsyncThunk("login",async (user:User) =>{})
export const authorise = createAsyncThunk("authorise",async (user:User) =>{})


export const userManagement = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    encrypt: () => {

    }
  },
});

export const { encrypt} = userManagement.actions;
export default userManagement.reducer;
