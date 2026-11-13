import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', className, children, ...props }) => {
  const base = "font-semibold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
    success: "bg-green-500 text-white hover:bg-green-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-6 py-2.5", lg: "px-8 py-3 text-lg" };
  
  return (
    <button className={twMerge(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
};