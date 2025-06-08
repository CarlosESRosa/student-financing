import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    register?: UseFormRegisterReturn;
    icon?: ReactNode;
    required?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, register, icon, required, ...props }, ref) => {
        return (
            <div className="space-y-1">
                {label && (
                    <label className="block text-sm font-medium text-gray-700">
                        {label}
                        {required && <span className="text-error ml-1">*</span>}
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
                            w-full px-4 py-2 rounded-[5px]
                            border border-gray-300
                            focus:outline-none focus:ring-2 focus:ring-primary/20
                            disabled:opacity-50 disabled:cursor-not-allowed
                            ${error ? 'border-error focus:ring-error/20' : ''}
                            ${icon ? 'pl-10' : ''}
                            ${className}
                        `}
                        required={required}
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