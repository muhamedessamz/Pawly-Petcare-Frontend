import React from 'react';
import { cn } from '../../utils/cn';

const Badge = ({ className, variant = 'default', ...props }) => {
    const variants = {
        default: 'bg-blue-50 text-blue-700 border-blue-100',
        secondary: 'bg-gray-100 text-gray-700 border-gray-200',
        success: 'bg-health/10 text-health border-health/20',
        playful: 'bg-playful/10 text-playful border-playful/20',
        outline: 'border-2 border-gray-100 text-gray-700',
    };

    return (
        <div
            className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors',
                variants[variant],
                className
            )}
            {...props}
        />
    );
};

export default Badge;
