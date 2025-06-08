import Swal from 'sweetalert2';
import type { SweetAlertIcon } from 'sweetalert2';

export function showAlert({
    title,
    text,
    icon = 'info',
    timer = 2000,
    showConfirmButton = false,
}: {
    title: string;
    text?: string;
    icon?: SweetAlertIcon;
    timer?: number;
    showConfirmButton?: boolean;
}) {
    Swal.fire({
        title,
        text,
        icon,
        timer: showConfirmButton ? undefined : timer,
        showConfirmButton,
        timerProgressBar: !showConfirmButton,
    });
} 