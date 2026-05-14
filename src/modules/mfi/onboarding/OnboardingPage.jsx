import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@shared/context/AuthContext';
import mfiService from '@shared/services/mfiService';
import Input from '@shared/components/ui/Input';
import Button from '@shared/components/ui/Button';
import Alert from '@shared/components/ui/Alert';

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    institutionName: user?.institutionName || '',
    licenseNumber: '',
    address: '',
    city: '',
    country: '',
    employeeCount: ''
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.institutionName) newErrors.institutionName = 'Institution name is required';
    if (!formData.licenseNumber) newErrors.licenseNumber = 'Business license number is required';
    if (!formData.address) newErrors.address = 'Street address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.country) newErrors.country = 'Country is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
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
      const response = await mfiService.createMFI(formData);
      if (response.success) {
        // In a real app, we might update the user record or just move forward
        navigate('/dashboard');
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
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Complete Your Business Profile</h1>
          <p className="mt-2 text-slate-600">Provide your business details to activate your Cashrecova lending infrastructure.</p>
        </div>

        <div className="bg-white shadow-xl shadow-slate-200/60 rounded-2xl border border-slate-100 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {apiError && <Alert type="error" message={apiError} onClose={() => setApiError('')} />}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  id="institutionName"
                  label="Institution Name"
                  value={formData.institutionName}
                  onChange={handleChange}
                  error={errors.institutionName}
                  required
                  className="sm:col-span-2"
                />

                <Input
                  id="licenseNumber"
                  label="Business License Number"
                  placeholder="e.g. BIZ-12345-ABC"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  error={errors.licenseNumber}
                  required
                />

                <Input
                  id="employeeCount"
                  label="Number of Employees"
                  type="number"
                  placeholder="e.g. 50"
                  value={formData.employeeCount}
                  onChange={handleChange}
                />

                <Input
                  id="address"
                  label="Street Address"
                  placeholder="123 Financial St"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                  required
                  className="sm:col-span-2"
                />

                <Input
                  id="city"
                  label="City"
                  placeholder="New York"
                  value={formData.city}
                  onChange={handleChange}
                  error={errors.city}
                  required
                />

                <Input
                  id="country"
                  label="Country"
                  placeholder="United States"
                  value={formData.country}
                  onChange={handleChange}
                  error={errors.country}
                  required
                />
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <Button 
                  type="submit" 
                  isLoading={isLoading}
                  className="w-full sm:w-auto sm:px-12"
                >
                  Complete Onboarding
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
