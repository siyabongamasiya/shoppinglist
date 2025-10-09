import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ShoppingList, ShoppingListItem, User } from "../models/models";
import axios from "axios";
import { toast } from "sonner";
import { refreshUser, type RefreshArgs } from "./userManagement";

// Define the initial state using that type
export interface SharerListState extends ShoppingList {
  isLoading: boolean;
  error: string | null;
}

const initialState: SharerListState = {
  ShoppingListId: "",
  ShoppingListName: "",
  ShoppingListDate: "",
  ShoppingListcategory: "",
  ShoppingListItems: [],
  isLoading: false,
  error: null,
};
export const getSharerList = createAsyncThunk(
  "sharerListManagement/getSharerList",
  async (
    {
      email,
      shoppingListId,
    }: {
      email: string | undefined;
      shoppingListId: string | undefined;
    },
    { rejectWithValue }
  ) => {
    try {
      toast.dismiss();
      toast.loading("Fetching shared shopping list...");

      // Fetch the user who shared the list
      const response = await axios.get(
        `http://localhost:3000/users?EmailAddress=${email}`
      );

      const sharer: User = response.data[0];

      if (!sharer) {
        toast.dismiss();
        toast.error("Sharer not found");
        return rejectWithValue("Sharer not found");
      }

      // Find the shared shopping list by ID
      const sharedList = sharer.shoppingLists.find(
        (list: ShoppingList) => list.ShoppingListId === shoppingListId
      );

      if (!sharedList) {
        toast.dismiss();
        toast.error("Shopping list not found");
        return rejectWithValue("Shopping list not found");
      }

      toast.dismiss();
      toast.success("Shared shopping list loaded successfully");

      // Return the found list
      return sharedList;
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || "Failed to fetch shared list");
      return rejectWithValue(error.message || "Failed to fetch shared list");
    }
  }
);

export const sharerShoppingListManagement = createSlice({
  name: "sharerListManagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getSharerList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getSharerList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const sharedList = action.payload;
        state.ShoppingListId = sharedList.ShoppingListId;
        state.ShoppingListName = sharedList.ShoppingListName;
        state.ShoppingListDate = sharedList.ShoppingListDate;
        state.ShoppingListcategory = sharedList.ShoppingListcategory;
        state.ShoppingListItems = sharedList.ShoppingListItems;
      })

      .addCase(getSharerList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default sharerShoppingListManagement.reducer;

