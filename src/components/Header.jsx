import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectToken, selectFirstName } from '../features/auth/authSlice.js';

export default function Header() {
  const token = useSelector(selectToken);
  const firstName = useSelector(selectFirstName);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    dispatch(logout());
    navigate('/');
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i> { firstName || 'Profile'}
            </Link>
            <button
              className="main-nav-item"
              onClick={onLogout}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <i className="fa fa-sign-out"></i> Sign Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
