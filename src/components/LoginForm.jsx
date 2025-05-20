import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [signupData, setSignupData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('signupData');
    if (storedData) {
      setSignupData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!loginData.email) tempErrors.email = 'Email is required';
    if (!loginData.password) tempErrors.password = 'Password is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (
        signupData &&
        loginData.email === signupData.email &&
        loginData.password === signupData.password
      ) {
        // ✅ Save login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedInUser', loginData.email);

        // ✅ Update App state
        setIsLoggedIn(true);

        alert('Login successful!');
        navigate('/products'); // Redirect
      } else {
        alert('Invalid email or password');
      }
    }
  };

  return (
    <form className="max-w-md mx-auto p-6 space-y-4 m-20" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      <input
        name="email"
        type="email"
        value={loginData.email}
        onChange={handleChange}
        placeholder="Email"
        className="p-2 border rounded w-full"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <input
        name="password"
        type="password"
        value={loginData.password}
        onChange={handleChange}
        placeholder="Password"
        className="p-2 border rounded w-full"
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

      <div className="flex justify-between items-center">
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Login
        </button>
        <Link to='/forgot'>
          <button type="button" className="text-blue-600 underline text-sm">
            Forgot Password?
          </button>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
