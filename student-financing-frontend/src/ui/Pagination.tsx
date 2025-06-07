import styled from 'styled-components';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const Btn = styled.button.attrs({
    className:
        'px-3 py-1 border rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed',
})``;

type Props = {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center gap-2 justify-end mt-4">
            <Btn disabled={page === 1} onClick={() => onChange(page - 1)}>
                <ChevronLeftIcon className="h-4 w-4" />
            </Btn>

            <span className="text-sm text-text font-semibold">
                Página {page} de {totalPages}
            </span>

            <Btn disabled={page === totalPages} onClick={() => onChange(page + 1)}>
                <ChevronRightIcon className="h-4 w-4" />
            </Btn>
        </div>
    );
}
