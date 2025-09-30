import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ShoppingListState {
  EmailAddress: string;
  Password: string;
  Name: string;
  Surname: string;
  Cellnumber: string;
}

// Define the initial state using that type
const initialState: ShoppingListState = {
  EmailAddress: "my email",
  Password: "12334456",
  Name: "siyabonga",
  Surname: "",
  Cellnumber: "067 698 4906",
};

export const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    login: (state,action) => {
      console.log(action.payload);
    //   state.value += 1;)
    },
    register: (state,action) => {
    //   state.value -= 1;
    },
    updateUser: (state,action) => {
    //   state.value -= 1;
    },
  },
});

export const { login,register,updateUser} = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
