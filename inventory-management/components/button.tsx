import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'; 
}


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
          variant === 'default' && 'bg-black text-white',
          variant === 'outline' && 'border border-gray-300 text-black bg-white',
          variant === 'ghost' && 'bg-transparent text-black',
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button"

export { Button }
