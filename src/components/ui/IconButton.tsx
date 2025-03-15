import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

// Define the button variants with consistent styling
const iconButtonVariants = cva(
  "flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-black text-white hover:bg-black/90",
        secondary: "bg-white text-black border border-black hover:bg-gray-100",
      },
      size: {
        default: "h-7 w-[74px] px-4", // Fixed width and height ensures consistent dimensions
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  children?: ReactNode; // Make children optional
  icon?: ReactNode;
}

export const IconButton = ({
  className,
  variant,
  size,
  children,
  icon,
  ...props
}: IconButtonProps) => {
  // Validate that either children or icon is provided
  if (!children && !icon) {
    console.warn('IconButton should have either children or icon prop');
  }
  
  return (
    <button
      className={clsx(iconButtonVariants({ variant, size }), className)}
      {...props}
    >
      {icon || children}
    </button>
  );
}; 