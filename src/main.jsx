// main.jsx

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from 'react-router-dom';

import './index.css';
import Layout from './components/Layout';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ForgotPassword from './components/ForgotPassword';
import ProductView from './components/ProductView';

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(storedLogin);
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/products" replace />
            ) : (
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/products" replace /> : <SignupForm />}
        />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route
          path="/products"
          element={isLoggedIn ? <ProductView /> : <Navigate to="/login" replace />}
        />
        <Route
          index
          element={<Navigate to={isLoggedIn ? '/products' : '/signup'} replace />}
        />
        <Route path="*" element={<div className="p-4 text-center">404 - Not Found</div>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
