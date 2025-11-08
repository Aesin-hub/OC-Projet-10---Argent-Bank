import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, selectLoading, selectError } from '../features/auth/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    
    const result = await dispatch(loginUser({ email, password, remember }));
    
    if (loginUser.fulfilled.match(result)) {
      navigate('/profile');
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle"></i>
        <h1>Sign In</h1>

        {error && <p className="error-message">Email ou mot de passe invalide.</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email" 
              id="email" 
              value={email} 
              onChange={(event) => setEmail(event.target.value)} 
              autoComplete="username" 
              required 
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(event) => setPassword(event.target.value)} 
              autoComplete="current-password" 
              required 
            />
          </div>

          <div className="input-remember">
            <input 
              type="checkbox" 
              id="remember-me"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)} 
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button type="submit" className="sign-in-button" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </section>
    </main>
  );
}