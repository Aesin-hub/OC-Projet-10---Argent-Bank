import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginApi, getProfileApi } from '../services/userApi.js';
import { setCredentials } from '../features/auth/authSlice.js';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = await loginApi({ email, password });

      if (remember) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      const profile = await getProfileApi(token);

      dispatch(setCredentials({ token, remember, firstName: profile?.firstName }));

      navigate('/profile');
    } catch (err) {
      setError('Email ou mot de passe invalide.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle"></i>
        <h1>Sign In</h1>

        { error && <p className="error-message">{error}</p> }

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email" 
              id="email" 
              value={email} 
              onChange={(event) => setEmail(event.target.value)} autoComplete="username" required 
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required 
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

          <button type="submit" className="sign-in-button">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </section>
    </main>
  );
}

