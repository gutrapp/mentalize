import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../helpers/cn.helper";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-text-lg font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[#514456] text-white hover:bg-[#514956] focus:ring-2 focus:ring-[#9883a5] focus:ring-offset-2",
        secondary:
          "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:ring-offset-2",
        outline:
          "bg-transparent border border-slate-300 hover:bg-slate-100 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
      },
      size: {
        default: "h-10 py-1 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({
  className,
  children,
  variant,
  size,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
};
