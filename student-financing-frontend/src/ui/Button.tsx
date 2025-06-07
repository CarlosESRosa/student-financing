import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    icon?: ReactNode;
    isLoading?: boolean;
    loadingText?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        children,
        variant = 'primary',
        icon,
        isLoading,
        loadingText,
        className = '',
        disabled,
        ...props
    }, ref) => {
        const baseStyles = `
            flex items-center justify-center gap-2
            px-6 py-3 rounded-xl
            font-medium
            transition-all duration-200
            disabled:opacity-40 disabled:cursor-not-allowed
        `;

        const variants = {
            primary: `
                bg-primary hover:bg-primary/90 
                text-white
                hover:scale-105
            `,
            secondary: `
                bg-secondary hover:bg-secondary/90 
                text-white
                hover:scale-105
            `,
            outline: `
                border border-gray-300 
                hover:bg-gray-50
                text-gray-700
            `,
        };

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={`
                    ${baseStyles}
                    ${variants[variant]}
                    ${className}
                `}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        {loadingText || 'Carregando...'}
                    </>
                ) : (
                    <>
                        {icon}
                        {children}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button; 