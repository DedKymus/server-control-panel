import { useState } from 'react';
import { RegisterForm } from "./RegisterForm";
import './RegisterForm.css'

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div style={{ padding: '20px', color: '#fff', backgroundColor: '#121212', minHeight: '100vh' }}>
      <header>
        <h1>Some text</h1>
        <button className='button' onClick={() => setIsAuthOpen(true)}>
          Log in / Register
        </button>
      </header>

      <main>
        <p>Main page content...</p>
      </main>

      {/* Модальне вікно форми */}
      <RegisterForm 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
    </div>
  );
}

export default App;