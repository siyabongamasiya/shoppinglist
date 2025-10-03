import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ShoppingList, ShoppingListItem, User } from "../models/models";
import axios from "axios";
import { toast } from "sonner";

// Define the initial state using that type
const initialState: ShoppingList = {
  ShoppingListId: "",
  ShoppingListName: "",
  ShoppingListDate: "",
  ShoppingListcategory: "",
  ShoppingListItems: [],
};

interface AddListArgs {
  email: string;
  shoppingList: ShoppingList;
  onShoplistAdded(): void;
}

interface AddListItemArgs {
  email: string;
  shoppingListId: string;
  shoppingListItem: ShoppingListItem;
  onShoplistItemAdded: () => void;
}

export const addList = createAsyncThunk(
  "shoppingListManagement/addList",
  async (
    { email, shoppingList, onShoplistAdded }: AddListArgs,
    { rejectWithValue }
  ) => {
    try {
      toast.dismiss();
      toast.loading("Adding shopping list...");

      // 1. Fetch the user
      const response = await axios.get(
        `http://localhost:3000/users?EmailAddress=${email}`
      );
      const user: User = response.data[0];

      if (!user) {
        toast.dismiss();
        return rejectWithValue("User not found");
      }

      console.log(user);
      // 2. Add the new shopping list to user's existing lists
      const updatedUser = {
        ...user,
        shoppingLists: [...user.shoppingLists, shoppingList],
      };

      // 3. PATCH the updated user
      await axios.patch(`http://localhost:3000/users/${user.id}`, updatedUser);

      toast.dismiss();
      toast.success("Shopping list added successfully");

      onShoplistAdded();

      return updatedUser;
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || "Failed to add shopping list");
      return rejectWithValue(error.message || "Failed to add shopping list");
    }
  }
);

export const updateList = createAsyncThunk(
  "userManagement/addListItem",
  async (
    {
      email,
      shoppingListId,
      shoppingListItem,
      onShoplistItemAdded,
    }: AddListItemArgs,
    { rejectWithValue }
  ) => {
    try {
      toast.dismiss();
      toast.loading("Adding shopping list item...");

      // 1. Fetch user by email
      const response = await axios.get(
        `http://localhost:3000/users?EmailAddress=${email}`
      );
      const user: User = response.data.find(
        (u: User) => u.EmailAddress === email
      );

      if (!user) {
        return rejectWithValue("User not found");
      }

      // 2. Copy user shopping lists
      const updatedShoppingLists = user.shoppingLists.map((list) =>
        list.ShoppingListId === shoppingListId
          ? {
              ...list,
              items: [...(list.ShoppingListItems || []), shoppingListItem], 
            }
          : list
      );

      // 3. Update the user object
      const updatedUser = { ...user, shoppingLists: updatedShoppingLists };

      // 4. Save changes to DB
      await axios.put(`http://localhost:3000/users/${user.id}`, updatedUser);

      toast.dismiss();
      toast.success("Item added successfully");
      onShoplistItemAdded();

      return updatedUser;
    } catch (error: any) {
      toast.dismiss();
      return rejectWithValue(error.message || "Failed to add list item");
    }
  }
);
export const deleteList = createAsyncThunk(
  "addList",
  async (shoppingList: ShoppingList) => {}
);
export const shareList = createAsyncThunk(
  "addList",
  async (shoppingList: ShoppingList) => {}
);

export const shoppingListManagent = createSlice({
  name: "shoppingListManagent",
  initialState,
  reducers: {},
});

// export const {viewList,sortList,searchList } = shoppingListManagent.actions;
export default shoppingListManagent.reducer;
