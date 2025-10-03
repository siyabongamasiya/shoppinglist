import { configureStore } from "@reduxjs/toolkit";
import userManagementReducer from "./src/features/login"

// ...

export const store = configureStore({
  reducer: {
    userManagement: userManagementReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
