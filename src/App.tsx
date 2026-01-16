import { HomePage } from "./pages/homepage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/profilepage";
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
import { SharerShopListPage } from "./pages/SharerShoplistPage";
import { useAppSelector } from "../hooks";

export default function App() {
  // Protected route wrapper
  function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const user = useAppSelector((state) => state.userManagement);

    if (!user.isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
  }

  function HomeRoute() {
    const navigate = useNavigate();
    return <HomePage onNavigateToProfile={() => navigate("/profile")} />;
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
    return <ShoppingListDetail />;
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="bottom-right" />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomeRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileRoute />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/register" element={<RegisterRoute />} />
          <Route
            path="/listItems/:id"
            element={
              <ProtectedRoute>
                <ShoppingListDetailRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sharerShopList/:id/:email"
            element={
              <ProtectedRoute>
                <SharerShopListPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
