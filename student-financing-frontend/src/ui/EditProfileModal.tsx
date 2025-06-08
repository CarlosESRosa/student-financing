import { type ReactNode } from 'react';
import styled from 'styled-components';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { createPortal } from 'react-dom';

const Backdrop = styled.div.attrs({
    className:
        'fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-max transition-opacity duration-300',
})``;

const Dialog = styled.div.attrs({
    className:
        'bg-surface rounded-2xl shadow-2xl p-8 w-full max-w-lg relative transform transition-all duration-300 scale-100 opacity-100',
})``;

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
};

export default function EditProfileModal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return createPortal(
        <Backdrop>
            <Dialog>
                <div className="flex items-center justify-between mb-6">
                    {title && (
                        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                    )}
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-error transition-colors duration-200"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                {children}
            </Dialog>
        </Backdrop>,
        document.body
    );
}
