import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import MainLayout from '../layout/mainLayout';
import Login from '../pages/login';
import MovieForm from '../pages/movieForm';
import MovieList from '../pages/movieList';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  console.log('isAuthenticated31221---->', typeof(isAuthenticated));
  return isAuthenticated ==='true'? children : <Navigate to="/login" />;
};
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route path="movies" element={<MovieList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
