import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import "../styles/RegisterPage.css";
import "../styles/globals.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { register, type RegisterArgs } from "../features/login";
import { useNavigate } from "react-router-dom";

type RegisterPageProps = {
  onRegister: (data: {
    email: string;
    password: string;
    name: string;
    surname: string;
    cellNumber: string;
  }) => void;
  onNavigateToLogin: () => void;
};

export function RegisterPage({
  onRegister,
  onNavigateToLogin,
}: RegisterPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cellnumber, setCellNumber] = useState("");
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userManagement);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !email ||
      !password ||
      !confirmPassword ||
      !name ||
      !surname ||
      !cellnumber
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    dispatch(
      register({
        email,
        password,
        name,
        surname,
        cellnumber,
        onNavigate: () => navigate("/"),
      } as RegisterArgs)
    );
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <div className="register-logo">
            <ShoppingCart />
            <span>ShopSmart</span>
          </div>
          <h2 className="register-title">Create Account</h2>
          <p className="register-description">
            Sign up to start managing your shopping lists
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="register-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={user.isLoading}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="surname" className="form-label">
                  Surname
                </label>
                <input
                  id="surname"
                  type="text"
                  placeholder="Doe"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  disabled={user.isLoading}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={user.isLoading}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cellNumber" className="form-label">
                Cell Number
              </label>
              <input
                id="cellNumber"
                type="tel"
                placeholder="+1234567890"
                value={cellnumber}
                onChange={(e) => setCellNumber(e.target.value)}
                disabled={user.isLoading}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={user.isLoading}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={user.isLoading}
                className="form-input"
              />
            </div>
          </div>

          <div className="register-footer">
            <button type="submit" className="btn" disabled={user.isLoading}>
              {user.isLoading ? "Creating account..." : "Register"}
            </button>

            <div className="register-footer-text">
              <span>Already have an account? </span>
              <button
                type="button"
                className="btn-link"
                onClick={onNavigateToLogin}
                disabled={user.isLoading}
              >
                Login here
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
