import { useState } from 'react';
import './RegisterForm.css';

interface RegisterFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegisterForm({ isOpen, onClose }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('register');

  if (!isOpen) return null; // Якщо вікно закрите — нічого не рендеримо

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (mode === 'register') {
      if (password !== confirmPassword) {
        alert('Паролі не збігаються!');
        return;
      }
      console.log('registering: ', { email, password });
    } else {
      console.log('logining: ', { email, password });
    }

    setIsLoggedIn(true);
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'register' ? 'login' : 'register'));
    setConfirmPassword('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='container' onClick={(e) => e.stopPropagation()}>

        {isLoggedIn ? (
          <div className='reg-container'>
            <h2 className='forgot'>Welcome back, {email}!</h2>
            <p className='forgot'>You are successfully logged in.</p>
            <button type="button" className='button' onClick={handleLogout}>
              Log out
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className='display'>
              
              {/* Ліва колонка */}
              <div className='reg-container'>
                <div className='row'>
                  <h2 className='h2'>{mode === 'register' ? 'Register' : 'Log in'}</h2>
                  <div className='switch-mode-container'>
                    <button type="button" className='reg-button' onClick={toggleMode}>
                      {mode === 'register' ? "Log in" : "Register"}
                    </button>
                  </div>
                </div>

                <div>
                  <input 
                    className='pass-input'
                    type="email" 
                    value={email} 
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>

                <div>
                  <input 
                    className='pass-input'
                    type="password" 
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>

                {mode === 'register' && (
                  <div>
                    <input
                      className='pass-input'
                      type='password'
                      value={confirmPassword}
                      placeholder='Repeat password'
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                )}

                <button type="submit" className='button'>
                  {mode === 'register' ? 'Register' : 'Log in'}
                </button>
                <p className='forgot'>Forgot password? 
                  <a className='ref' href="https://lnk.ua/FqKoi5Gu7"> reset</a>
                  </p>
              </div>

              <hr className="vertical-line" />

              {/* Права колонка */}
              <div className='reg-container'>
                <div className='photo-button-div'>
                  <p className='text'>Quick sign up</p>
                  <button type="button" className='photo-button'>
                    <span>Log in with GitHub</span>
                  </button>
                  <button type="button" className='photo-button'>
                    <span>Log in with Google</span>
                  </button>
                </div>
              </div>

            </div>
          </form>
        )}
      </div>
    </div>
  );
}