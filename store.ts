import { configureStore } from "@reduxjs/toolkit";
import userManagementReducer from "./src/features/userManagement";
import shoppingListManagentReducer from "./src/features/shoppingListManagement";

// ...

export const store = configureStore({
  reducer: {
    userManagement: userManagementReducer,
    shoppingListManagent: shoppingListManagentReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
