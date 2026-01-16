# Shopping List App - AI Coding Agent Instructions

## Project Overview

React + TypeScript + Vite shopping list management application using Redux Toolkit with persistence, json-server backend, and Radix UI components.

## Architecture & Data Flow

### State Management (Redux Toolkit + Persistence)

- **Store location**: Root-level `store.ts` (NOT in src/)
- **State persisted** to localStorage via `redux-persist` with whitelist: `userManagement`, `shoppingListManagent`, `sharerListManagement`
- **Three feature slices** in `src/features/`:
  - `userManagement.ts` - authentication, user CRUD
  - `shoppingListManagement.ts` - list/item CRUD operations
  - `sharerListmanagement.ts` - shared list functionality
- **Typed hooks**: Use `useAppDispatch()` and `useAppSelector()` from root `hooks.ts` (NOT `reduxHooks.ts`, which is deprecated)
- **All async operations** use `createAsyncThunk` with toast notifications (sonner)

### Data Models (`src/models/models.ts`)

Class-based models with explicit constructor assignments:

- `User`: Contains nested `shoppingLists: ShoppingList[]` array
- `ShoppingList`: Contains `ShoppingListItems: ShoppingListItem[]` array
- Property naming: **PascalCase** (e.g., `ShoppingListId`, `EmailAddress`)

### Backend Integration

- **json-server** on `http://localhost:3000`
- Database file: `src/data/db.json`
- **User-centric data model**: All shopping lists stored as nested arrays within user objects
- **CRUD pattern**: Fetch user → modify nested arrays → PATCH/PUT entire user object
- After mutations, dispatch `refreshUser()` to sync Redux state with backend

## Component Architecture

### File Organization

- **Root-level utilities**: `utilities.ts` (ID generation, date formatting), `hooks.ts` (typed Redux hooks)
- **Components**: `src/components/` - Mix of Radix UI wrappers and app-specific components
- **Pages**: `src/pages/` with separate CSS files in `src/styles/`
- **Routing**: Functional route components in `App.tsx` (e.g., `HomeRoute()`, `ProfileRoute()`) using `react-router-dom`

### Styling Convention

- **Separate CSS files** per component/page in `src/styles/` and `src/styles/components/`
- Class naming: kebab-case (e.g., `.modal-overlay`, `.list-card-header`)
- Import pattern: `import "../styles/components/component-name.css"`

### Component Patterns

- **Dialog/Modal components**: Custom implementations (not Radix Dialog directly)
  - Structure: `modal-overlay` → `modal-content` → `modal-header`/`modal-body`/`modal-footer`
  - Example: [AddListDialog.tsx](src/components/AddListDialog.tsx)
- **Props pattern**: Callback props with `on` prefix (e.g., `onNavigateToProfile`, `onShoplistAdded`)
- **Navigation**: Pass `onNavigate*` callbacks from route components, call `useNavigate()` in route wrappers

## Development Workflows

### Running the Application

```bash
# Frontend dev server (port 5173)
npm run dev

# Backend API (must run separately in another terminal)
npx json-server src/data/db.json --port 3000
```

### Build & Lint

```bash
npm run build    # TypeScript check + Vite build
npm run lint     # ESLint check
```

## Critical Patterns & Gotchas

### Redux Async Thunks

All thunks follow this pattern:

1. `toast.loading()` on start
2. Fetch user by email from backend
3. Modify user's nested arrays (shopping lists/items)
4. PATCH/PUT updated user object
5. `dispatch(refreshUser())` to sync state
6. `toast.success()` / `toast.error()` based on result
7. Call success callback (e.g., `onShoplistAdded()`)

Example from [shoppingListManagement.ts](src/features/shoppingListManagement.ts#L28-L76):

```typescript
export const addList = createAsyncThunk(
  "shoppingListManagement/addList",
  async (
    { email, shoppingList, onShoplistAdded }: AddListArgs,
    { dispatch, rejectWithValue }
  ) => {
    toast.loading("Adding shopping list...");
    const response = await axios.get(
      `http://localhost:3000/users?EmailAddress=${email}`
    );
    const user: User = response.data[0];
    const updatedUser = {
      ...user,
      shoppingLists: [...user.shoppingLists, shoppingList],
    };
    await axios.patch(`http://localhost:3000/users/${user.id}`, updatedUser);
    dispatch(refreshUser({ email, password: user.Password }));
    onShoplistAdded();
    return updatedUser;
  }
);
```

### ID Generation

Use `generateUniqueId()` from root `utilities.ts` for new entities (format: `id-${timestamp}-${random}`).

### Date Handling

Use `getTodayDateString()` from `utilities.ts` for consistent YYYY-MM-DD format.

### Authentication Flow

- No real auth backend - credentials stored in user objects
- Password hashing: crypto-js (check `userManagement.ts`)
- Protected routes: Check `useAppSelector((state) => state.userManagement)` in route components

## Key Files Reference

- **[store.ts](store.ts)**: Redux store configuration with persistence
- **[hooks.ts](hooks.ts)**: Typed Redux hooks (use these, not reduxHooks.ts)
- **[src/features/shoppingListManagement.ts](src/features/shoppingListManagement.ts)**: Main CRUD operations for lists/items
- **[src/models/models.ts](src/models/models.ts)**: Data model classes with PascalCase properties
- **[src/App.tsx](src/App.tsx)**: Route definitions and navigation patterns
- **[utilities.ts](utilities.ts)**: ID generation and date formatting helpers

## Common Tasks

### Adding a new feature slice

1. Create slice in `src/features/` using `createSlice` + `createAsyncThunk`
2. Add reducer to `rootReducer` in `store.ts`
3. Add slice name to `persistConfig.whitelist` if state should persist

### Creating a new component

1. Add component file to `src/components/`
2. Create corresponding CSS file in `src/styles/components/`
3. Import CSS at top of component file
4. Use Radix UI primitives where applicable (extensive collection already installed)

### Adding a new page

1. Create page component in `src/pages/`
2. Create CSS file in `src/styles/`
3. Add route wrapper function in `App.tsx` (e.g., `NewPageRoute()`)
4. Add `<Route>` element in the `<Routes>` block
