import './Header.css';

interface HeaderProps {
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  email?: string;
  onLogout: () => void;
}

export function Header({ onOpenAuth, isLoggedIn, email, onLogout }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">
          <h2>Cool name</h2>
        </div>

        <nav className="nav-links">
          <a href='#'>Main</a>
          <a href="#about">About</a>
          <a href="#contact">Contacts</a>
        </nav>

        <div className="auth-action">
          {isLoggedIn ? (
            <div className="user-panel">
              <span className="user-email">{email}</span>
              <button className="logout-btn" onClick={onLogout}>
                Quit
              </button>
            </div>
          ) : (
            <button className="login-open-btn" onClick={onOpenAuth}>
              Log in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}