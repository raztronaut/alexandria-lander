import React, { HTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

// Heading component with variants
const headingVariants = cva(
  "font-medium tracking-tight text-alexandria-foreground", 
  {
    variants: {
      variant: {
        default: "",
        title: "font-pp-editorial-new tracking-tighter leading-extra-tight",
        subtitle: "font-sans",
        accent: "font-sans font-bold uppercase",
      },
      size: {
        default: "text-heading-3",
        xs: "text-heading-4",
        sm: "text-heading-3",
        md: "text-heading-2",
        lg: "text-heading-1",
        xl: "text-alexandria-small",
        "2xl": "text-alexandria-medium",
        "3xl": "text-alexandria-large",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface HeadingProps 
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
}

export const Heading = ({
  className,
  variant,
  size,
  as: Component = 'h2',
  children,
  ...props
}: HeadingProps) => {
  return (
    <Component 
      className={clsx(headingVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};

// Text component with variants
const textVariants = cva(
  "text-alexandria-foreground", 
  {
    variants: {
      variant: {
        default: "",
        muted: "text-alexandria-muted-foreground",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        default: "text-body-normal leading-normal",
        xs: "text-caption",
        sm: "text-body-small",
        md: "text-body-normal",
        lg: "text-body-large leading-relaxed",
      },
      weight: {
        default: "font-normal",
        light: "font-light",
        medium: "font-medium",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      weight: "default",
    },
  }
);

export interface TextProps 
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div';
  children: ReactNode;
}

export const Text = ({
  className,
  variant,
  size,
  weight,
  as: Component = 'p',
  children,
  ...props
}: TextProps) => {
  return (
    <Component 
      className={clsx(textVariants({ variant, size, weight }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}; 