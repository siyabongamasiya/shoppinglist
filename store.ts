import { configureStore } from '@reduxjs/toolkit'
import shoppingListReducer from './src/features/authenticate'

// ...

export const store = configureStore({
  reducer: {
    shoppingList:shoppingListReducer
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch