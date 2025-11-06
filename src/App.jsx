import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './features/auth/authSlice';
import { getProfileApi } from './services/userApi';
import AppRouter from "./router";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function restoreSession() {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const remember = !!localStorage.getItem('token');
      
      if (token) {
        try {
          const profile = await getProfileApi(token);
          
          dispatch(setCredentials({
            token,
            remember,
            firstName: profile?.firstName,
            lastName: profile?.lastName,
            userName: profile?.userName
          }));
        } catch (error) {
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          console.error('Session expirée', error);
        }
      }
    }

    restoreSession();
  }, [dispatch]);

  return <AppRouter />;
}