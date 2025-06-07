import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: ReactNode;
    isLoading?: boolean;
    loadingText?: string;
};

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
    ({ className = '', icon, isLoading, loadingText, children, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={`
                    flex items-center justify-center gap-2
                    px-6 py-3 rounded-xl
                    bg-primary hover:bg-primary/90 
                    text-surface font-medium
                    transition-all duration-200
                    hover:scale-105
                    disabled:opacity-40 disabled:cursor-not-allowed
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