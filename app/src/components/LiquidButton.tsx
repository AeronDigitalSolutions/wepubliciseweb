import React from 'react';
import { Link } from 'react-router-dom';

interface LiquidButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  variant?: 'wine' | 'teal' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  target?: string;
  rel?: string;
  disabled?: boolean;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  children,
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  variant = 'wine',
  size = 'md',
  target,
  rel,
  disabled,
}) => {
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-7 py-3.5 text-sm sm:text-base',
    lg: 'px-9 py-4 text-base sm:text-lg',
  }[size];

  const variantClass = variant === 'teal' ? 'liquid-btn-teal' : 'liquid-btn-wine';

  const baseClasses = `liquid-btn ${variantClass} ${sizeClasses} rounded-full font-semibold border transition-all duration-300 ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        onClick={onClick}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default LiquidButton;
