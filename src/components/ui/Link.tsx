import React, { AnchorHTMLAttributes, ReactNode } from 'react';
import NextLink from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const linkVariants = cva(
  "inline-flex items-center font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-alexandria-primary", 
  {
    variants: {
      variant: {
        default: "hover:underline underline-offset-4",
        button: "bg-alexandria-primary text-alexandria-primary-foreground hover:bg-black/90 rounded-md py-2 px-4",
        ghost: "hover:text-alexandria-foreground/80",
        icon: "",
      },
      size: {
        default: "text-body-normal",
        sm: "text-body-small",
        lg: "text-body-large",
      },
      hasIcon: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        hasIcon: true,
        variant: "default",
        className: "gap-1",
      },
      {
        hasIcon: true,
        variant: "button",
        className: "gap-2",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      hasIcon: false,
    },
  }
);

export interface LinkProps 
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  href: string;
  children: ReactNode;
  isExternal?: boolean;
  iconPosition?: 'left' | 'right';
  iconElement?: ReactNode;
}

export const Link = ({
  className,
  variant,
  size,
  href,
  children,
  isExternal = false,
  iconPosition = 'right',
  iconElement,
  ...props
}: LinkProps) => {
  // Default arrow icon if none provided
  const icon = iconElement || <span className="ml-[0.25em]">↗</span>;
  
  // Determine if we have an icon
  const hasIcon = !!iconElement || (variant === 'default' && isExternal);
  
  // Prepare content with icon placement
  const content = (
    <>
      {hasIcon && iconPosition === 'left' && icon}
      {children}
      {hasIcon && iconPosition === 'right' && icon}
    </>
  );

  // External link attributes
  const externalProps = isExternal ? {
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": `${props['aria-label'] || children} (opens in a new tab)`,
  } : {};

  // Use Next.js Link for internal links, and regular anchor for external
  return isExternal ? (
    <a 
      href={href}
      className={clsx(linkVariants({ variant, size, hasIcon }), className)}
      tabIndex={0}
      {...externalProps}
      {...props}
    >
      {content}
    </a>
  ) : (
    <NextLink 
      href={href}
      className={clsx(linkVariants({ variant, size, hasIcon }), className)}
      tabIndex={0}
      {...props}
    >
      {content}
    </NextLink>
  );
}; 