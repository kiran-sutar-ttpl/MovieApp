// src/hooks/useAuth.ts
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';

export const useAuth = () => {
  const  isAuthenticated  = localStorage.getItem('isAuthenticated')
  return { isAuthenticated };
};
