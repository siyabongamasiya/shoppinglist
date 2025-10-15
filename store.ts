import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import userManagementReducer from "./src/features/userManagement";
import shoppingListManagentReducer from "./src/features/shoppingListManagement";
import sharerShoppingListManagementReducer from "./src/features/sharerListmanagement";
// ...

const rootReducer = combineReducers({
  userManagement: userManagementReducer,
  shoppingListManagent: shoppingListManagentReducer,
  sharerListManagement: sharerShoppingListManagementReducer,
});
const persistConfig = {
  key: "root", 
  storage,
  whitelist: ["userManagement", "shoppingListManagent","sharerListManagement"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
