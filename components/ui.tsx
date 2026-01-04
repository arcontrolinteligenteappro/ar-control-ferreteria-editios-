import React from 'react';

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  disabled = false 
}) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-colors active:scale-95 duration-100 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-ferre-orange text-white hover:bg-orange-600 disabled:bg-orange-300",
    secondary: "bg-ferre-dark text-white hover:bg-slate-800 disabled:bg-slate-600",
    danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 disabled:text-slate-300"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-100 p-4 ${className}`}>
    {children}
  </div>
);

export interface InputProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  className = '',
  icon
}) => (
  <div className={`relative ${className}`}>
    {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 ${icon ? 'pl-10' : 'pl-3'} pr-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ferre-orange/50 focus:border-ferre-orange transition-all`}
    />
  </div>
);