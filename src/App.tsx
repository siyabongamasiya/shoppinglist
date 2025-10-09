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
  Navigate,
} from "react-router-dom";
import { store } from "../store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { useAppSelector } from "../hooks";
import { SharerShopListPage } from "./pages/SharerShoplistPage";

export default function App() {

  function HomeRoute() {
    const navigate = useNavigate();
    return (
      <HomePage
        onNavigateToProfile={() => navigate("/profile")}
      />
    );
  }

  function ProfileRoute() {
    const user = useAppSelector((state) => state.userManagement)
    
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
          <Route path="/sharerShopList/:id/:email" element={<SharerShopListPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
