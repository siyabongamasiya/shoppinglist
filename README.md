# Shopping List

## Project Overview

This is a **Shopping List** application built with **React** and **TypeScript**. It provides users with a platform to manage their shopping lists. The application utilizes modern web development practices and a robust state management system to offer a dynamic and efficient user experience.

### Features
*   **User Authentication**: Users can register for a new account and log in.
*   **User Profiles**: Authenticated users can view and update their profile information.
*   **Shopping List Management**: Users can view the details of their shopping lists.
*   **Sharing Functionality**: Shopping lists can be shared with other users via a unique link.
*   **Centralized State Management**: Powered by **Redux Toolkit** and **Redux Persist** for predictable state management and data persistence.
*   **Modern UI Components**: Built using the **Radix UI** component library for accessible and customizable UI elements.
*   **Routing**: Handles multiple page views for different user flows with `react-router-dom`.
*   **API Interaction**: Uses `axios` for making HTTP requests, likely for interacting with a backend API (potentially simulated by `json-server` during development).
*   **Form Handling**: Manages form state with `react-hook-form`.
*   **Toast Notifications**: Provides user feedback with non-blocking notifications via `sonner`.

## Technologies

### Core
*   **React**: A JavaScript library for building user interfaces.
*   **TypeScript**: Adds static typing to JavaScript for improved code quality and maintainability.
*   **Redux Toolkit**: The standard for writing Redux logic, including state slicing and immutable updates with Immer.
*   **React-Redux**: Official bindings for Redux in React.
*   **Redux-Persist**: A library to save and rehydrate the Redux state to and from storage.
*   **React-Router-Dom v6**: Enables client-side routing.
*   **Axios**: A promise-based HTTP client for making API requests.

### Developer Tools
*   **Vite**: A fast, modern build tool for frontend development.
*   **ESLint**: A linter for identifying and reporting on patterns in JavaScript code.
*   **Json-server**: A tool for creating a fake REST API for prototyping and development.

## Getting Started

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/siyabongamasiya/shoppinglist.git
    cd shoppinglist
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    # or
    yarn install
    ```

### Running the Application

**Development Server:**
To run the application in development mode, execute the following command:
```sh
npm run dev
---

This will start the Vite development server, typically accessible at http://localhost:5173. 
Build for Production:
To create a production-ready build of the application, run:
npm run build

This command compiles the TypeScript code and bundles the project using Vite.
Preview Production Build:
To serve the production build locally, run: 
npm run preview

API Simulation
The project uses json-server to simulate a backend API during development. To run it, you would typically have a command like this:
json-server --watch db.json --port 3001
Use code with caution.

(Note: A command for running json-server is not explicitly listed in the scripts object, so you may need to add one or run it manually to use the development API.)
Available Routes
The App.tsx file defines the following routes:
/: Home Page - The main landing page for authenticated users.
/profile: Profile Page - Allows users to view and update their profile.
/login: Login Page - The page for user authentication.
/register: Register Page - The page for new user account creation.
/listItems/:id: Shopping List Detail - Displays the contents of a specific shopping list.
/sharerShopList/:id/:email: Shared Shopping List - Provides a view for a shared shopping list.
*: Redirect to Home - All unknown routes are redirected to the homepage. 
