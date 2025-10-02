import { Home, User as UserIcon, LogOut, ShoppingCart } from 'lucide-react';
import '../styles/Navigation.css';
import type { User } from '../models/models';

type NavigationProps = {
  user: User;
  onNavigateToHome: () => void;
  onNavigateToProfile?: () => void;
  onLogout: () => void;
  currentPage?: 'home' | 'profile' | 'list-detail';
};

export function Navigation({
  user: _user,
  onNavigateToHome,
  onLogout,
  onNavigateToProfile,
  currentPage = 'home',
}: NavigationProps) {
  return (
    <nav className="navigation">
      <div className="navigation-container">
        <div className="navigation-content">
          <div className="navigation-brand">
            <ShoppingCart />
            <span>ShopSmart</span>
          </div>

          <div className="navigation-links">
            <button
              className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
              onClick={onNavigateToHome}
            >
              <Home />
              <span>Home</span>
            </button>

            {onNavigateToProfile && (
              <button
                className={`nav-button ${currentPage === 'profile' ? 'active' : ''}`}
                onClick={onNavigateToProfile}
              >
                <UserIcon />
                <span>Profile</span>
              </button>
            )}

            <button
              className="nav-button"
              onClick={onLogout}
            >
              <LogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
