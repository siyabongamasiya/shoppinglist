import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ShoppingList, ShoppingListItem, User } from "../models/models";
import axios from "axios";
import { toast } from "sonner";
import { refreshUser, type RefreshArgs } from "./userManagement";

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

export interface AddListItemArgs {
  email: string;
  shoppingListId: string;
  shoppingListItem: ShoppingListItem;
  onShoplistItemAdded: () => void;
}

export const addList = createAsyncThunk(
  "shoppingListManagement/addList",
  async (
    { email, shoppingList, onShoplistAdded }: AddListArgs,
    { dispatch,rejectWithValue }
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

      dispatch(
        refreshUser({
          email: updatedUser.EmailAddress,
          password: updatedUser.Password,
        })
      );

      return updatedUser;
    } catch (error: any) {
      toast.dismiss();  
      toast.error(error.message || "Failed to add shopping list");
      return rejectWithValue(error.message || "Failed to add shopping list");
    }
  }
);

export const deleteList = createAsyncThunk(
  "shoppingListManagement/deleteList",
  async (
    {
      email,
      shoppingListId
    }: {
      email: string;
      shoppingListId: string;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      toast.dismiss();
      toast.loading("Deleting shopping list...");

      // 1. Fetch user by email
      const response = await axios.get(
        `http://localhost:3000/users?EmailAddress=${email}`
      );
      const user: User = response.data[0];

      if (!user) {
        toast.dismiss();
        return rejectWithValue("User not found");
      }

      // 2. Remove the targeted shopping list
      const updatedShoppingLists = user.shoppingLists.filter(
        (list) => list.ShoppingListId !== shoppingListId
      );

      const updatedUser = {
        ...user,
        shoppingLists: updatedShoppingLists,
      };

      // 3. Update user data on backend
      await axios.patch(`http://localhost:3000/users/${user.id}`, updatedUser);

      // 4. Refresh Redux user state
      dispatch(
        refreshUser({
          email: updatedUser.EmailAddress,
          password: updatedUser.Password,
        })
      );

      toast.dismiss();
      toast.success("Shopping list deleted successfully");

      return updatedUser;
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || "Failed to delete shopping list");
      return rejectWithValue(error.message || "Failed to delete shopping list");
    }
  }
);


export const editList = createAsyncThunk(
  "shoppingListManagement/editList",
  async (
    {
      email,
      shoppingListId,
      updatedListData,
    }: {
      email: string;
      shoppingListId: string;
      updatedListData: Partial<ShoppingList>;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      toast.dismiss();
      toast.loading("Updating shopping list...");

      const response = await axios.get(
        `http://localhost:3000/users?EmailAddress=${email}`
      );
      const user: User = response.data[0];

      if (!user) {
        toast.dismiss();
        return rejectWithValue("User not found");
      }

      const updatedShoppingLists = user.shoppingLists.map((list) =>
        list.ShoppingListId === shoppingListId
          ? { ...list, ...updatedListData }
          : list
      );

      const updatedUser = { ...user, shoppingLists: updatedShoppingLists };

      await axios.patch(`http://localhost:3000/users/${user.id}`, updatedUser);

      toast.dismiss();
      toast.success("Shopping list updated successfully");

      dispatch(
        refreshUser({ email: user.EmailAddress, password: user.Password })
      );

      return updatedUser;
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || "Failed to update shopping list");
      return rejectWithValue(error.message || "Failed to update shopping list");
    }
  }
);

export const editListItem = createAsyncThunk(
  "shoppingListManagement/editListItem",
  async (
    {
      email,
      shoppingListId,
      shoppingListItemId,
      updatedItemData,
    }: {
      email: string;
      shoppingListId: string;
      shoppingListItemId: string;
      updatedItemData: Partial<ShoppingListItem>;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      toast.dismiss();
      toast.loading("Updating shopping list item...");

      // Fetch the user
      const response = await axios.get(
        `http://localhost:3000/users?EmailAddress=${email}`
      );
      const user: User = response.data[0];

      if (!user) {
        toast.dismiss();
        return rejectWithValue("User not found");
      }

      // Update the specific shopping list item
      const updatedShoppingLists = user.shoppingLists.map((list) => {
        if (list.ShoppingListId !== shoppingListId) return list;

        const updatedItems = list.ShoppingListItems.map((item) =>
          item.ShoppingListItemId === shoppingListItemId
            ? { ...item, ...updatedItemData }
            : item
        );

        return { ...list, ShoppingListItems: updatedItems };
      });

      const updatedUser = { ...user, shoppingLists: updatedShoppingLists };

      // PATCH the user with updated data
      await axios.patch(`http://localhost:3000/users/${user.id}`, updatedUser);

      toast.dismiss();
      toast.success("Shopping list item updated successfully");

      // Refresh user state
      dispatch(
        refreshUser({
          email: user.EmailAddress,
          password: user.Password,
        })
      );

      return updatedUser;
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || "Failed to update shopping list item");
      return rejectWithValue(
        error.message || "Failed to update shopping list item"
      );
    }
  }
);

export const deleteListItem = createAsyncThunk(
  "shoppingListManagement/deleteListItem",
  async (
    {
      email,
      shoppingListId,
      shoppingListItemId,
      onItemDeleted,
    }: {
      email: string;
      shoppingListId: string;
      shoppingListItemId: string;
      onItemDeleted?: () => void;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      toast.dismiss();
      toast.loading("Deleting item...");

      // Fetch the user
      const response = await axios.get(
        `http://localhost:3000/users?EmailAddress=${email}`
      );
      const user: User = response.data[0];

      if (!user) {
        toast.dismiss();
        return rejectWithValue("User not found");
      }

      // Update the specific shopping list by filtering out the item
      const updatedShoppingLists = user.shoppingLists.map((list) => {
        if (list.ShoppingListId !== shoppingListId) return list;

        const filteredItems = list.ShoppingListItems.filter(
          (item) => item.ShoppingListItemId !== shoppingListItemId
        );

        return { ...list, ShoppingListItems: filteredItems };
      });

      const updatedUser = { ...user, shoppingLists: updatedShoppingLists };

      //  PATCH updated user
      await axios.patch(`http://localhost:3000/users/${user.id}`, updatedUser);

      toast.dismiss();
      toast.success("Item deleted successfully");

      // Optional callback
      if (onItemDeleted) onItemDeleted();

      //  Refresh user data in Redux
      dispatch(
        refreshUser({
          email: user.EmailAddress,
          password: user.Password,
        })
      );

      return updatedUser;
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || "Failed to delete item");
      return rejectWithValue(error.message || "Failed to delete item");
    }
  }
);




export const addListItem = createAsyncThunk(
  "userManagement/addListItem",
  async (
    {
      email,
      shoppingListId,
      shoppingListItem,
    }: AddListItemArgs,
    { dispatch, rejectWithValue }
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
              ShoppingListItems: [
                ...(list.ShoppingListItems || []),
                shoppingListItem,
              ],
            }
          : list
      );

      // 3. Update the user object
      const updatedUser = { ...user, shoppingLists: updatedShoppingLists };

      // 4. Save changes to DB
      await axios.put(`http://localhost:3000/users/${user.id}`, updatedUser);

      toast.dismiss();
      toast.success("Item added successfully");
      dispatch(
        refreshUser({
          email: user.EmailAddress,
          password: user.Password,
        } as RefreshArgs)
      );

      return updatedUser;
    } catch (error: any) {
      toast.dismiss();
      return rejectWithValue(error.message || "Failed to add list item");
    }
  }
);

export const shoppingListManagent = createSlice({
  name: "shoppingListManagent",
  initialState,
  reducers: {},
});

// export const {viewList,sortList,searchList } = shoppingListManagent.actions;
export default shoppingListManagent.reducer;
