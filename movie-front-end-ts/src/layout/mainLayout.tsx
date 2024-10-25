import React from 'react';
import '../styles/components/mainLyout.scss'
import { Outlet } from 'react-router-dom';  // Outlet will render child routes

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
        <main className="main-content">
          <Outlet />
        </main>
    </div>
  );
};

export default MainLayout;
