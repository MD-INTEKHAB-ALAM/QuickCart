// Layout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ isLoggedIn, setIsLoggedIn }) => {
  const [cart, setCart] = useState({});

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} cart={cart} />
      <main className="min-h-screen">
        <Outlet context={{ cart, setCart }} />
      </main>
    </>
  );
};

export default Layout;
