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

export default function App() {
  const user = new User(
    "siya@gmail.com",
    "password",
    "siyabonga",
    "khanyile",
    "0676984906"
  );
  // Demo state; in a real app you'd fetch/store globally
  const [shoppingLists, setShoppingLists] = React.useState<ShoppingList[]>([]);

  function HomeRoute() {
    const navigate = useNavigate();
    return (
      <HomePage
        user={user}
        shoppingLists={shoppingLists}
        onLogout={() => navigate("/login")}
        onNavigateToProfile={() => navigate("/profile")}
        onNavigateToListDetail={(id) => navigate(`/lists/${id}`)}
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
        user={user}
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
    const navigate = useNavigate();
    const { id } = useParams();
    const list = shoppingLists.find((l) => String((l as any).ShoppingListId ?? (l as any).id) === id);
    if (!list) {
      return <Navigate to="/" replace />;
    }
    return (
      <ShoppingListDetail
        user={user}
        list={list}
        onNavigateToHome={() => navigate("/")}
        onLogout={() => navigate("/login")}
        onAddItem={() => {}}
        onUpdateItem={() => {}}
        onDeleteItem={() => {}}
      />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/profile" element={<ProfileRoute />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/register" element={<RegisterRoute />} />
        <Route path="/lists/:id" element={<ShoppingListDetailRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
