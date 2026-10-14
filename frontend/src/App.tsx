import { useState } from 'react';
import { RegisterForm } from "./RegisterForm";
import { Header } from './Header';
import './RegisterForm.css'
import './Header.css'
import './App.css'

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
  }

  return (
    <div>
      <Header
        onOpenAuth={() => setIsAuthOpen(true)} 
        isLoggedIn={isLoggedIn}
        email={userEmail}
        onLogout={handleLogout}
      />

      <main>
        <p>Main page content...</p>
      </main>

      {/* modal window */}
      <RegisterForm 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
    </div>
  );
}

export default App;