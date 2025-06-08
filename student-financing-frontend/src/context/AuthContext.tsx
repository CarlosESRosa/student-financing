import {
    createContext,
    useReducer,
    useContext,
    useEffect,
    useCallback,
    type ReactNode,
} from 'react';
import { api } from '../services/api';

export type User = {
    id: string;
    nome: string;
    sobrenome: string;
    email: string;
};

type State = {
    user: User | null;
    token: string | null;
    loading: boolean;
};

type Action =
    | { type: 'LOGIN'; payload: { user: User; token: string } }
    | { type: 'LOGOUT' }
    | { type: 'BOOTSTRAP_START' }
    | { type: 'BOOTSTRAP_SUCCESS'; payload: { user: User; token: string } }
    | { type: 'BOOTSTRAP_FAIL' };

const initialState: State = {
    user: null,
    token: null,
    loading: true,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'LOGIN':
        case 'BOOTSTRAP_SUCCESS':
            return { ...state, ...action.payload, loading: false };
        case 'BOOTSTRAP_START':
            return { ...state, loading: true };
        case 'BOOTSTRAP_FAIL':
        case 'LOGOUT':
            return { user: null, token: null, loading: false };
        default:
            return state;
    }
}

type AuthContextValue = {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, senha: string) => Promise<void>;
    register: (
        nome: string,
        sobrenome: string,
        email: string,
        senha: string,
    ) => Promise<void>;
    logout: () => void;
    getToken: () => string | null;
};

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const storageKey = 'sf-token';

    /* persiste ou remove o token */
    const persist = (token: string | null) => {
        if (token) localStorage.setItem(storageKey, token);
        else localStorage.removeItem(storageKey);
    };

    /* --- restaura sessão ao carregar app --- */
    const bootstrap = useCallback(async () => {
        const token = localStorage.getItem(storageKey);
        if (!token) return dispatch({ type: 'BOOTSTRAP_FAIL' });

        dispatch({ type: 'BOOTSTRAP_START' });
        try {
            const { data: user } = await api.get<User>('/me');
            dispatch({ type: 'BOOTSTRAP_SUCCESS', payload: { user, token } });
        } catch {
            persist(null);
            dispatch({ type: 'BOOTSTRAP_FAIL' });
        }
    }, []);

    useEffect(() => {
        bootstrap();
    }, [bootstrap]);

    const login = async (email: string, senha: string) => {
        /* 1. POST /login */
        const res = await api.post('/login', { email, senha });

        // 🔑 paths corretos
        const token = res.data.data.token;
        const user = res.data.data.student as User;

        if (!token) throw new Error('Token não veio na resposta /login');

        /* 2. persiste + header global */
        persist(token);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        /* 3. atualiza contexto */
        dispatch({ type: 'LOGIN', payload: { user, token } });
    };

    const register = async (
        nome: string,
        sobrenome: string,
        email: string,
        senha: string,
    ) => {
        await api.post('/register', { nome, sobrenome, email, senha });
        await login(email, senha);   // login já usa o path correto
    };

    const logout = () => {
        persist(null);
        dispatch({ type: 'LOGOUT' });
    };

    const getToken = () => state.token;

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                isAuthenticated: !!state.user,
                login,
                register,
                logout,
                getToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
