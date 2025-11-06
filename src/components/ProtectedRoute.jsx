import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, logout } from "../features/auth/authSlice.js";

export default function ProtectedRoute({ children }) {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  
  if (!token) {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }
  
  return children;
}