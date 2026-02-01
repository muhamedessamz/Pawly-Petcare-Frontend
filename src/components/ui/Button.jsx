import React from 'react';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
        primary: 'bg-primary text-white hover:bg-blue-700 shadow-sm hover:shadow-md',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        outline: 'border-2 border-gray-200 bg-transparent hover:border-primary hover:text-primary text-gray-700',
        ghost: 'hover:bg-gray-100 text-gray-700',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        playful: 'bg-playful text-white hover:bg-amber-600 shadow-sm hover:shadow-md',
    };

    const sizes = {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 py-2.5',
        lg: 'h-14 px-10 text-lg',
        icon: 'h-11 w-11 p-2.5 flex items-center justify-center',
    };

    return (
        <button
            ref={ref}
            className={cn(
                'btn-premium',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
});

Button.displayName = 'Button';

export default Button;
