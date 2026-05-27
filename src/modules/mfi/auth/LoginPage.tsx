import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@shared/context/AuthContext';
import AuthLayout from '@shared/components/layout/AuthLayout';
import Input from '@shared/components/ui/Input';
import Button from '@shared/components/ui/Button';
import Alert from '@shared/components/ui/Alert';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id as keyof typeof formData]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError('');
    
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await login(formData);
      if (response.success) {
        navigate('/dashboard');
      } else {
        setApiError(response.message || 'Login failed');
      }
    } catch (err) {
      setApiError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your Cashrecova dashboard to manage lending and collections."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {apiError && <Alert type="error" message={apiError} className="mb-4" onClose={() => setApiError('')} />}
        
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

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-semibold text-slate-700">Password</label>
            <Link to="/forgot-password" className="text-xs font-semibold text-primary-500 hover:text-primary-400">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
        </div>

        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full" 
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </div>

        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          <p className="text-sm text-slate-600">
            New to Cashrecova?{' '}
            <Link to="/register" className="font-semibold text-primary-500 hover:text-primary-400">
              Register your institution
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
