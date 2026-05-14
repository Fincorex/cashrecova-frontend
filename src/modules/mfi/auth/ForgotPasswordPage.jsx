import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '@shared/components/layout/AuthLayout';
import Input from '@shared/components/ui/Input';
import Button from '@shared/components/ui/Button';
import Alert from '@shared/components/ui/Alert';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your email to receive reset instructions"
    >
      {isSubmitted ? (
        <div className="text-center">
          <Alert 
            type="success" 
            message="If an account exists with that email, you will receive password reset instructions shortly." 
            className="mb-6"
          />
          <Link to="/login">
            <Button variant="secondary" className="w-full">
              Back to Login
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            label="Business Email"
            type="email"
            placeholder="admin@institution.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full" 
              isLoading={isLoading}
            >
              Send Reset Link
            </Button>
          </div>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm font-semibold text-primary-500 hover:text-primary-400">
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
