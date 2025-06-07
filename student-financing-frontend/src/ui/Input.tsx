import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    register?: UseFormRegisterReturn;
    icon?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, register, icon, ...props }, ref) => {
        return (
            <div className="space-y-2">
                {label && (
                    <label className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
                            w-full px-4 py-3 rounded-xl
                            border border-gray-300
                            focus:outline-none focus:ring-2 focus:ring-primary/20
                            disabled:opacity-50 disabled:cursor-not-allowed
                            ${error ? 'border-error focus:ring-error/20' : ''}
                            ${icon ? 'pl-10' : ''}
                            ${className}
                        `}
                        {...register}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-sm text-error animate-fade-in">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input; 