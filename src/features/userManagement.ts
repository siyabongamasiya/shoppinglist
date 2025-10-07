import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../models/models";
import axios from "axios";
import { toast } from "sonner";
import { generateUniqueId } from "../../utilities";

export interface UserState extends User {
  isLoading: boolean;
  isLoggedIn: boolean;
  error?: string;
}

export interface LoginArgs {
  email: string;
  password: string;
  onNavigate(): void;
}
export interface RefreshArgs {
  email: string;
  password: string;
}

export interface RegisterArgs {
  email: string;
  password: string;
  name: string;
  surname: string;
  cellnumber: string;
  onNavigate: () => void;
}

interface UpdatePasswordArgs {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  onPasswordUpdated() : void
}

const initialState: UserState = {
  id: "",
  EmailAddress: "my email",
  Password: "12334456",
  Name: "siyabonga",
  Surname: "",
  Cellnumber: "067 698 4906",
  shoppingLists: [],
  isLoading: false,
  isLoggedIn: false,
  error: "",
};

export const refreshUser = createAsyncThunk(
  "userManagement/refreshUser",
  async ({ email, password }: RefreshArgs, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/users");

      const user: User = response.data.find(
        (u: User) => u.EmailAddress === email && u.Password === password
      );

      if (!user) {
        return rejectWithValue("User not found or incorrect credentials");
      }
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch user");
    }
  }
);

export const updatePassword = createAsyncThunk(
  "userManagement/updatePassword",
  async (
    {
      email,
      currentPassword,
      newPassword,
      confirmNewPassword,
      onPasswordUpdated
    }: UpdatePasswordArgs,
    { dispatch, getState, rejectWithValue }
  ) => {
    const user = getState() as { userManagement: UserState };
    // Validate current password
    if (currentPassword !== user.userManagement.Password) {
      return rejectWithValue("Current password is incorrect");
    }

    // Validate match
    if (newPassword !== confirmNewPassword) {
      return rejectWithValue("New passwords do not match");
    }

    try {
      toast.dismiss();
      toast.loading("Updating password...");

      const response = await axios.get(
        `http://localhost:3000/users?EmailAddress=${email}`
      );
      const currentUser: User = response.data[0];

      const updatedUser = {
        ...currentUser,
        Password: newPassword,
      };

      await axios.patch(
        `http://localhost:3000/users/${currentUser.id}`,
        updatedUser
      );

      dispatch(
        refreshUser({
          email: updatedUser.EmailAddress,
          password: updatedUser.Password,
        })
      );
      onPasswordUpdated()
      toast.dismiss();
      toast.success("Password updated successfully");
      return updatedUser;
    } catch (error) {
      return rejectWithValue("Failed to update password");
    }
  }
);

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
        id: generateUniqueId(),
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

export const updateUserDetails = createAsyncThunk(
  "userManagement/updateUserDetails",
  async (
    {
      name,
      surname,
      email,
      cellNumber,
      onProfileUpdated,
    }: {
      name: string;
      surname: string;
      email: string;
      cellNumber: string;
      onProfileUpdated?: () => void;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      if (!email) {
        return rejectWithValue("No logged-in user found");
      }

      toast.dismiss();
      toast.loading("Updating profile...");

      // Fetch the latest user data from backend
      const response = await axios.get(
        `http://localhost:3000/users?EmailAddress=${email}`
      );
      const currentUser: User = response.data[0];

      if (!currentUser) {
        toast.dismiss();
        return rejectWithValue("User not found");
      }

      // Merge new data
      const updatedUser = {
        ...currentUser,
        Name: name,
        Surname: surname,
        EmailAddress: email,
        Cellnumber: cellNumber,
      };

      // Update on backend
      await axios.patch(
        `http://localhost:3000/users/${currentUser.id}`,
        updatedUser
      );

      toast.dismiss();
      toast.success("Profile updated successfully");

      // Optional callback
      if (onProfileUpdated) onProfileUpdated();

      // Refresh Redux user state
      dispatch(
        refreshUser({
          email: updatedUser.EmailAddress,
          password: updatedUser.Password,
        })
      );
      return updatedUser;
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || "Failed to update profile");
      return rejectWithValue(error.message || "Failed to update profile");
    }
  }
);


export const userManagement = createSlice({
  name: "userManagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.id = action.payload.id;
        state.EmailAddress = action.payload.EmailAddress;
        state.Password = action.payload.Password;
        state.Name = action.payload.Name;
        state.Surname = action.payload.Surname;
        state.Cellnumber = action.payload.Cellnumber;
        state.isLoggedIn = true;
        state.shoppingLists = action.payload.shoppingLists;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.dismiss();
        toast.error(action.payload as string);
      })

      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.id = action.payload.id;
        state.EmailAddress = action.payload.EmailAddress;
        state.Password = action.payload.Password;
        state.Name = action.payload.Name;
        state.Surname = action.payload.Surname;
        state.Cellnumber = action.payload.Cellnumber;
        state.isLoggedIn = true;
        state.shoppingLists = action.payload.shoppingLists;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.dismiss();
        toast.error(action.payload as string);
      })

      // Refresh
      .addCase(refreshUser.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.id = action.payload.id;
        state.EmailAddress = action.payload.EmailAddress;
        state.Password = action.payload.Password;
        state.Name = action.payload.Name;
        state.Surname = action.payload.Surname;
        state.Cellnumber = action.payload.Cellnumber;
        state.shoppingLists = action.payload.shoppingLists;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.dismiss();
        toast.error(action.payload as string);
      })

      // update password
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.id = action.payload.id;
        state.EmailAddress = action.payload.EmailAddress;
        state.Password = action.payload.Password;
        state.Name = action.payload.Name;
        state.Surname = action.payload.Surname;
        state.Cellnumber = action.payload.Cellnumber;
        state.shoppingLists = action.payload.shoppingLists;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.dismiss();
        toast.error(action.payload as string);
      });
  },
});

export default userManagement.reducer;
