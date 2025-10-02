import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import '../styles/LoginPage.css';
import "../styles/globals.css"

type LoginPageProps = {
  onLogin: (email: string, password: string) => void;
  onNavigateToRegister: () => void;
};

export function LoginPage({ onLogin, onNavigateToRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Login successful!');
      onLogin(email, password);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <ShoppingCart />
            <span>ShopSmart</span>
          </div>
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-description">
            Sign in to manage your shopping lists
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="form-input"
            />
          </div>

          <div className="login-footer">
            <button
              type="submit"
              className="btn"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </button>

            <div className="login-footer-text">
              <span>Don't have an account? </span>
              <button
                type="button"
                className="btn-link"
                onClick={onNavigateToRegister}
                disabled={isLoading}
              >
                Register here
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
