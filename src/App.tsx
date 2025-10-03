import { ShoppingList, ShoppingListItem, User } from "./models/models";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegisterPage } from "./pages/RegisterPage";
import { ShoppingListDetail } from "./pages/ShoppingListDetail";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import React from "react";
import { store } from "../store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

export default function App() {

  function HomeRoute() {
    const navigate = useNavigate();
    return (
      <HomePage
        onLogout={() => navigate("/login")}
        onNavigateToProfile={() => navigate("/profile")}
        onAddList={(name, category) => {
          // no-op placeholder; wire to backend
        }}
        onUpdateList={() => {}}
        onDeleteList={() => {}}
        searchQuery=""
        setSearchQuery={() => {}}
        sortBy="date"
        setSortBy={() => {}}
      />
    );
  }

  function ProfileRoute() {
    const navigate = useNavigate();
    return (
      <ProfilePage
        onUpdateUser={() => {}}
        onNavigateToHome={() => navigate("/")}
        onLogout={() => navigate("/login")}
      />
    );
  }

  function LoginRoute() {
    const navigate = useNavigate();
    return (
      <LoginPage
        onLogin={() => navigate("/")}
        onNavigateToRegister={() => navigate("/register")}
      />
    );
  }

  function RegisterRoute() {
    const navigate = useNavigate();
    return (
      <RegisterPage
        onRegister={() => navigate("/")}
        onNavigateToLogin={() => navigate("/login")}
      />
    );
  }

  function ShoppingListDetailRoute() {
    return (
      <ShoppingListDetail
        onAddItem={() => {}}
        onUpdateItem={() => {}}
        onDeleteItem={() => {}}
      />
    );
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
      <Toaster position="bottom-right"/>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/profile" element={<ProfileRoute />} />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/register" element={<RegisterRoute />} />
          <Route path="/listItems/:id" element={<ShoppingListDetailRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
