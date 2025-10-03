import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../models/models";
import axios from "axios";
import { toast } from "sonner";

interface UserState extends User {
  isLoading: boolean;
  error?: string;
}

export interface LoginArgs {
  email: string;
  password: string;
  onNavigate(): void;
}

export interface RegisterArgs {
  email: string;
  password: string;
  name: string;
  surname: string;
  cellnumber: string;
  onNavigate: () => void;
}


const initialState: UserState = {
  EmailAddress: "my email",
  Password: "12334456",
  Name: "siyabonga",
  Surname: "",
  Cellnumber: "067 698 4906",
  shoppingLists: [],
  isLoading: false,
  error: "",
};

export const login = createAsyncThunk(
  "userManagement/login",
  async ({ email, password, onNavigate }: LoginArgs, { rejectWithValue }) => {
    try {
      toast.dismiss();
      toast.message("Logging in...");
      const response = await axios.get("http://localhost:3000/users");

      const user: User = response.data.find(
        (u: User) => u.EmailAddress === email && u.Password === password
      );
      if (!user) {
        return rejectWithValue("User not found or incorrect credentials");
      }
      toast.dismiss();
      toast.success("Logged in successfully");
      onNavigate();
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch user");
    }
  }
);

export const register = createAsyncThunk(
  "userManagement/register",
  async (
    { email, password, name, surname, cellnumber, onNavigate }: RegisterArgs,
    { rejectWithValue }
  ) => {
    try {
      // Dismiss previous toasts
      toast.dismiss();
      toast.loading("Registering user...");

      // Fetch existing users
      const response = await axios.get("http://localhost:3000/users");
      const existingUser: User = response.data.find(
        (u: User) => u.EmailAddress === email
      );

      if (existingUser) {
        toast.dismiss();
        toast.error("Email is already registered");
        return rejectWithValue("Email is already registered");
      }

      // Create new user object
      const newUser: User = {
        EmailAddress: email,
        Password: password,
        Name: name,
        Surname: surname,
        Cellnumber: cellnumber,
        shoppingLists: [],
      };

      // POST new user to JSON Server
      await axios.post("http://localhost:3000/users", newUser);

      toast.dismiss();
      toast.success("Registered successfully");
      onNavigate(); 

      return newUser;
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || "Failed to register user");
      return rejectWithValue(error.message || "Failed to register user");
    }
  }
);

export const userManagement = createSlice({
  name: "userManagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending || register.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(login.fulfilled || register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.EmailAddress = action.payload.EmailAddress;
        state.Password = action.payload.Password;
        state.Name = action.payload.Name;
        state.Surname = action.payload.Surname;
        state.Cellnumber = action.payload.Cellnumber;
        state.shoppingLists = action.payload.shoppingLists;
      })
      .addCase(login.rejected || register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.dismiss();
        toast.error(action.payload as string);
      });
  },
});

export default userManagement.reducer;
