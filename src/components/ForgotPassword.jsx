import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [signupData, setSignupData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('signupData');
    if (storedData) {
      setSignupData(JSON.parse(storedData));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (!signupData || email !== signupData.email) {
      setError('No account found with this email.');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const updatedData = { ...signupData, password: newPassword };
    localStorage.setItem('signupData', JSON.stringify(updatedData));
    setMessage('Password has been reset successfully!');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-700">Reset Password</h2>

        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border rounded w-full"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-3 border rounded w-full"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-3 border rounded w-full"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Reset Password
        </button>

        <Link
          to="/login"
          className="block text-center bg-gray-300 text-black py-2 rounded hover:bg-gray-400 transition"
        >
          Back to Login
        </Link>
      </form>
    </div>
  );
};

export default ResetPassword;
