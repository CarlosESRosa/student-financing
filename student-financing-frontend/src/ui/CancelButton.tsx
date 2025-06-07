import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type CancelButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: ReactNode;
};

export const CancelButton = forwardRef<HTMLButtonElement, CancelButtonProps>(
    ({ className = '', icon, children, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled}
                className={`
                    flex items-center justify-center gap-2
                    px-6 py-3 rounded-xl
                    bg-gray-100 hover:bg-gray-200
                    text-gray-700 font-medium
                    transition-all duration-200
                    hover:scale-105
                    disabled:opacity-40 disabled:cursor-not-allowed
                    ${className}
                `}
                {...props}
            >
                {icon}
                {children}
            </button>
        );
    }
); 