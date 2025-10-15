'use client';

import * as React from 'react';
import Link from 'next/link';

const Button = React.forwardRef<HTMLButtonElement, any>(({
  className = '',
  variant = 'default',
  size = 'default',
  href,
  children,
  textColor,
  borderColor,
  hoverBgColor,
  style = {},
  ...props
}, ref) => {
  // Variant classes
  const variantClasses = {
    default: 'bg-accent text-white hover:bg-accent/90',
    outline: 'border border-current text-current',
    ghost: 'hover:bg-accent/10 text-accent',
    link: 'text-accent underline-offset-4 hover:underline',
  };

  // Size classes
  const sizeClasses = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
    icon: 'h-10 w-10',
  };

  // Base button classes
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // Get variant and size classes
  let variantClass = variantClasses[variant as keyof typeof variantClasses] || variantClasses.default;
  const sizeClass = sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default;
  
  // Handle custom styles
  const customStyles = { ...style };
  
  // Handle text color
  if (textColor) {
    customStyles.color = textColor;
  }
  
  // Handle border color for outline variant
  if (variant === 'outline' && borderColor) {
    customStyles.borderColor = borderColor;
  }
  
  // Handle hover background
  if (hoverBgColor) {
    variantClass += ` hover:bg-[${hoverBgColor}]`;
  } else if (variant === 'outline') {
    variantClass += ' hover:bg-accent/10';
  }
  
  // Merge all classes
  const classes = [
    baseClasses,
    variantClass,
    sizeClass,
    className,
  ].filter(Boolean).join(' ');

  if (href) {
    return (
      <Link 
        href={href} 
        className={classes}
        style={customStyles}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      ref={ref}
      style={customStyles}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
