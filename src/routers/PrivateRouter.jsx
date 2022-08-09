import { Navigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const PrivateRouter = ({ children }) => {
  const { user } = useContext(AuthContext)

  const onAuth = Object.entries(user).length === 0;
  return onAuth ?  <Navigate to="/session" /> : children;
};
