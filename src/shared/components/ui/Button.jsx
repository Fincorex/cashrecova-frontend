import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  disabled = false, 
  onClick,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100";
  
  const variants = {
    primary: "bg-primary-500 text-white hover:bg-primary-600 shadow-md shadow-primary-500/25",
    secondary: "bg-white text-theme-text-primary border border-theme-divider hover:bg-theme-bg-subtle",
    outline: "bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
    danger: "bg-rose-500 text-white hover:bg-rose-600 shadow-md shadow-rose-200/50",
    ghost: "bg-transparent text-theme-text-secondary hover:bg-theme-bg-subtle"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base"
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : children}
    </button>
  );
};

export default Button;
