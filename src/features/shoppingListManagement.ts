import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ShoppingList} from "../models/models";

// Define the initial state using that type
const initialState: ShoppingList = {
  ShoppingListId:"",
  ShoppingListName:"",
  ShoppingListDate:"",
  ShoppingListcategory:"",
  ShoppingListItems:[]
};

export const addList = createAsyncThunk("addList",async (shoppingList:ShoppingList) =>{})
export const updateList = createAsyncThunk("addList",async (shoppingList:ShoppingList) =>{})
export const deleteList = createAsyncThunk("addList",async (shoppingList:ShoppingList) =>{})
export const shareList = createAsyncThunk("addList",async (shoppingList:ShoppingList) =>{})

export const shoppingListManagent = createSlice({
  name: "shoppingListManagent",
  initialState,
  reducers: {
    viewList : (state,action) => {

    },
    sortList : (state) => {

    },
    searchList: (state) => {

    }
  },
});

export const {viewList,sortList,searchList } = shoppingListManagent.actions;
export default shoppingListManagent.reducer;
