# Shopping List App

A modern, feature-rich shopping list management application built with React, TypeScript, and Vite. Organize your shopping lists, manage items, and share lists with others seamlessly.

## Features

- 🛒 **Create & Manage Lists** - Organize items by category (Groceries, Hardware, etc.)
- ✅ **Item Management** - Add, edit, delete, and check off items as you shop
- 👥 **List Sharing** - Share shopping lists with other users
- 💾 **Data Persistence** - Redux persist keeps your data safe across sessions
- 🎨 **Modern UI** - Built with Radix UI components for accessibility and aesthetics
- 🔐 **User Authentication** - Register and login to manage your personal lists
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **State Management**: Redux Toolkit with redux-persist
- **Routing**: React Router DOM v7
- **UI Components**: Radix UI primitives
- **Backend**: json-server (mock REST API)
- **HTTP Client**: Axios
- **Notifications**: Sonner (toast notifications)
- **Styling**: Custom CSS with kebab-case naming convention
- **Icons**: Lucide React

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Backend Server

The application uses json-server as a mock backend. Run this in a **separate terminal**:

```bash
npx json-server src/data/db.json --port 3000
```

The API will be available at `http://localhost:3000`

### 3. Start the Development Server

In another terminal, start the Vite dev server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### 5. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
shoppinglist/
├── .github/
│   └── copilot-instructions.md    # AI coding agent instructions
├── public/                         # Static assets
├── src/
│   ├── components/                 # React components (Radix UI wrappers + app components)
│   ├── data/
│   │   └── db.json                # json-server database
│   ├── features/                   # Redux Toolkit feature slices
│   │   ├── userManagement.ts
│   │   ├── shoppingListManagement.ts
│   │   └── sharerListmanagement.ts
│   ├── models/
│   │   └── models.ts              # TypeScript data models
│   ├── pages/                      # Page components
│   ├── styles/                     # CSS files
│   │   └── components/            # Component-specific styles
│   ├── App.tsx                     # Main app with routing
│   └── main.tsx                    # Entry point
├── hooks.ts                        # Typed Redux hooks
├── store.ts                        # Redux store configuration
├── utilities.ts                    # Helper functions (ID generation, date formatting)
└── package.json
```

## Key Concepts

### State Management

The app uses Redux Toolkit with three main feature slices:

- **userManagement**: User authentication and profile management
- **shoppingListManagement**: CRUD operations for lists and items
- **sharerListManagement**: Shared list functionality

State is persisted to localStorage using `redux-persist`.

### Data Model

The application uses a **user-centric data model** where:

- Each `User` contains an array of `ShoppingList[]`
- Each `ShoppingList` contains an array of `ShoppingListItem[]`
- All properties use PascalCase naming (e.g., `ShoppingListId`, `EmailAddress`)

### CRUD Pattern

All data mutations follow this pattern:

1. Fetch user by email from json-server
2. Modify the user's nested arrays (shopping lists/items)
3. PATCH/PUT the entire user object back to json-server
4. Dispatch `refreshUser()` to sync Redux state with backend

### Typed Redux Hooks

Always use the typed hooks from `hooks.ts`:

```typescript
import { useAppDispatch, useAppSelector } from "../hooks";

const dispatch = useAppDispatch();
const user = useAppSelector((state) => state.userManagement);
```

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start development server (port 5173) |
| `npm run build`   | Build for production                 |
| `npm run lint`    | Run ESLint                           |
| `npm run preview` | Preview production build             |

## Development Notes

- **Backend Required**: Always run json-server before starting the frontend
- **Toast Notifications**: All async operations show loading/success/error toasts
- **Utility Functions**: Use `generateUniqueId()` and `getTodayDateString()` from `utilities.ts`
- **Styling**: Each component has a corresponding CSS file in `src/styles/components/`
- **Navigation**: Route components in `App.tsx` use functional wrappers for navigation callbacks

