import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@shared/context/AuthContext';
import AuthLayout from '@shared/components/layout/AuthLayout';
import Input from '@shared/components/ui/Input';
import Button from '@shared/components/ui/Button';
import Alert from '@shared/components/ui/Alert';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    institutionName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.institutionName) newErrors.institutionName = 'Institution name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear field-specific error when user types
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await register(formData);
      if (response.success) {
        // Success: AuthContext handles the state and we redirect
        navigate('/onboarding');
      } else {
        setApiError(response.message);
      }
    } catch (err) {
      setApiError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Scale Your Lending" 
      subtitle="Join Cashrecova to automate your repayments and manage loans at scale."
    >
      <form onSubmit={handleSubmit} className="space-y-1">
        {apiError && <Alert type="error" message={apiError} className="mb-6" onClose={() => setApiError('')} />}
        
        <Input
          id="institutionName"
          label="Institution Name"
          placeholder="e.g. Global Microfinance Corp"
          value={formData.institutionName}
          onChange={handleChange}
          error={errors.institutionName}
          required
        />

        <Input
          id="email"
          label="Business Email"
          type="email"
          placeholder="admin@institution.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <Input
          id="phone"
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />

        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-4">
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full" 
            isLoading={isLoading}
          >
            Create Account
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-500 hover:text-primary-400">
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
