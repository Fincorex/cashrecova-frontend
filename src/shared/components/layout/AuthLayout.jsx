import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center mb-6">
          <span className="text-3xl font-bold tracking-tight text-primary-500">
            Cashrecova<span className="text-slate-900">.</span>
          </span>
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-center text-sm text-slate-600">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-xl shadow-slate-200/60 rounded-2xl border border-slate-100 sm:px-10">
          {children}
        </div>
        
        <p className="mt-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Cashrecova Technologies. Secure Lending & Collections Platform.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
