import React, { HTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const sectionVariants = cva(
  "w-full bg-white", 
  {
    variants: {
      variant: {
        default: "pt-0 pb-16",
        hero: "pt-0 pb-16",
        compact: "py-8",
        spacious: "py-24",
      },
      container: {
        true: "container",
        false: "",
      },
      divider: {
        none: "",
        top: "border-t border-alexandria-border",
        bottom: "border-b border-alexandria-border",
        both: "border-t border-b border-alexandria-border",
      },
    },
    defaultVariants: {
      variant: "default",
      container: true,
      divider: "none",
    },
  }
);

export interface SectionProps 
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: 'section' | 'div' | 'article';
  children: ReactNode;
  innerClassName?: string;
}

export const Section = ({
  className,
  innerClassName,
  variant,
  container,
  divider,
  as: Component = 'section',
  children,
  ...props
}: SectionProps) => {
  // If container is true, wrap children in a container div
  const content = container ? (
    <div className={clsx("h-full", innerClassName)}>
      {children}
    </div>
  ) : children;

  return (
    <Component 
      className={clsx(sectionVariants({ variant, container, divider }), className)}
      {...props}
    >
      {content}
    </Component>
  );
};

// Create a specialized Row component for layout within sections
export interface RowProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  reverse?: boolean;
  spacing?: 'none' | 'small' | 'default' | 'large';
}

export const Row = ({
  className,
  children,
  reverse = false,
  spacing = 'default',
  ...props
}: RowProps) => {
  const spacingClasses = {
    'none': 'md:space-x-0',
    'small': reverse ? 'md:space-x-reverse md:space-x-4' : 'md:space-x-4',
    'default': reverse ? 'md:space-x-reverse md:space-x-8' : 'md:space-x-8',
    'large': reverse ? 'md:space-x-reverse md:space-x-16' : 'md:space-x-16',
  };

  return (
    <div
      className={clsx(
        "flex flex-col md:flex-row",
        reverse && "md:flex-row-reverse",
        spacingClasses[spacing],
        "gap-y-4 md:gap-y-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Column component for use within rows
export interface ColumnProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  width?: 'auto' | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | '1/5' | '4/5';
  divider?: boolean;
}

export const Column = ({
  className,
  children,
  width = 'auto',
  divider = false,
  ...props
}: ColumnProps) => {
  const widthClasses = {
    'auto': '',
    'full': 'md:w-full',
    '1/2': 'md:w-1/2',
    '1/3': 'md:w-1/3',
    '2/3': 'md:w-2/3',
    '1/4': 'md:w-1/4',
    '3/4': 'md:w-3/4',
    '1/5': 'md:w-1/5',
    '4/5': 'md:w-4/5',
  };

  return (
    <div
      className={clsx(
        "w-full",
        widthClasses[width],
        divider && "md:border-l border-alexandria-border md:pl-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}; 