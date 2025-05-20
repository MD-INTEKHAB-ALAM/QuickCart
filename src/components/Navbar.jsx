// Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn, cart }) => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    setCartCount(totalItems);
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false); // ✅ Update state here
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        MyStore
      </div>

      <div className="space-x-6">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link to="/cart" className="hover:underline relative">
              Cart
              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
