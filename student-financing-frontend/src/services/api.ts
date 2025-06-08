import axios from 'axios';
import { showAlert } from '../utils/alert';

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

// ------------- Request interceptor (token) -------------
api.interceptors.request.use(cfg => {
    // Para evitar circular import, pegue token direto do localStorage
    const token = localStorage.getItem('sf-token');
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
});

// ------------- Response interceptor (401) --------------
api.interceptors.response.use(res => res, err => {
    if (err.response?.status === 401) {
        // Limpa token e força refresh da página para login
        localStorage.removeItem('sf-token');
        showAlert({
            title: 'Sessão expirada',
            text: 'Sua sessão expirou por segurança. Faça login novamente para continuar.',
            icon: 'warning',
            showConfirmButton: false,
            timer: 3500,
        });
        setTimeout(() => {
            window.location.href = '/';
        }, 3500);
    }
    return Promise.reject(err);
});


const initialToken = localStorage.getItem('sf-token');
if (initialToken) {
    api.defaults.headers.common.Authorization = `Bearer ${initialToken}`;
}