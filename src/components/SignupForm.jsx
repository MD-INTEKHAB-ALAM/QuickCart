import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const SignupForm = () => {
  const [formData, setFormData] = useState({
    userType: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    mobile: '',
    fax: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem('signupData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const tempErrors = {};
    const requiredFields = [
      'userType', 'firstName', 'email', 'address', 'country',
      'state', 'city', 'pincode', 'mobile', 'phone', 'password', 'confirmPassword'
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        tempErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    if (formData.password && formData.password.length < 8) {
      tempErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem('signupData', JSON.stringify(formData));
      alert('Signup successful!');
      navigate('/login');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center text-blue-700">Create an Account</h2>

        <div className="flex justify-center gap-6">
          {['Individual', 'Enterprise', 'Government'].map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="radio"
                name="userType"
                value={type}
                checked={formData.userType === type}
                onChange={handleChange}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
        {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name *" className="p-3 border rounded w-full" />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="p-3 border rounded w-full" />
        </div>

        <div>
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email *" className="p-3 border rounded w-full" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <input name="address" value={formData.address} onChange={handleChange} placeholder="Address *" className="p-3 border rounded w-full" />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input name="country" value={formData.country} onChange={handleChange} placeholder="Country *" className="p-3 border rounded w-full" />
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>
          <div>
            <input name="state" value={formData.state} onChange={handleChange} placeholder="State *" className="p-3 border rounded w-full" />
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input name="city" value={formData.city} onChange={handleChange} placeholder="City *" className="p-3 border rounded w-full" />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          <div>
            <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode *" className="p-3 border rounded w-full" />
            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
          </div>
        </div>

        <div>
          <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile *" className="p-3 border rounded w-full" />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="fax" value={formData.fax} onChange={handleChange} placeholder="Fax (optional)" className="p-3 border rounded w-full" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone *" className="p-3 border rounded w-full" />
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password *"
            className="p-3 border rounded w-full"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password *"
            className="p-3 border rounded w-full"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
