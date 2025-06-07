import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // ⚠️ só para typings

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
        window.location.href = '/';
    }
    return Promise.reject(err);
});


const initialToken = localStorage.getItem('sf-token');
if (initialToken) {
    api.defaults.headers.common.Authorization = `Bearer ${initialToken}`;
}