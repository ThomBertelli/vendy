import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface User {
    email: string;
    token: string;
}

const apiUrl = import.meta.env.VITE_API_URL;
const apiCredential = import.meta.env.VITE_API_CREDENTIAL;

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();
    const isLoggedIn = ref(false);
    const currentUser = ref<User | null>(null);
    const loading = ref(false);

    const storage = {
        store(key: string, value: string) {
            localStorage.setItem(key, value);
        },
        get(key: string) {
            return localStorage.getItem(key);
        },
        remove(key: string) {
            localStorage.removeItem(key);
        }
    };

    const success = (json: any, onSuccess: () => void) => {
        storage.store('token', json.token);
        storage.store('email', json.email);
        currentUser.value = { email: json.email, token: json.token };
        isLoggedIn.value = true;
        onSuccess();
    };

    const failure = (onFailure: () => void) => {
        onFailure();
    };

    const signIn = async (email: string, password: string, remember: boolean, onSuccess: () => void, onFailure: () => void) => {
        loading.value = true;
        const body = {
            login: {
                email: email,
                password: password
            }
        };
        try {
            const response = await fetch(`${apiUrl}/sign_in`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-API-KEY": `${apiCredential}`
                },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                const json = await response.json();
                success(json, onSuccess);
            } else {
                failure(onFailure);
            }
        } catch (error) {
            console.error(error);
            failure(onFailure);
        } finally {
            loading.value = false;
        }
    };

    const signUp = async (email: string, password: string, onSuccess: () => void, onFailure: () => void) => {
        loading.value = true;
        const body = {
            user: {
                email: email,
                password: password
            }
        };
        try {
            const response = await fetch(`${apiUrl}/new`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-API-KEY": `${apiCredential}`
                },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                const json = await response.json();
                success(json, onSuccess);
            } else {
                failure(onFailure);
            }
        } catch (error) {
            console.error(error);
            failure(onFailure);
        } finally {
            loading.value = false;
        }
    };

    const signOut = () => {
        isLoggedIn.value = false;
        currentUser.value = null;
        storage.remove('token');
        storage.remove('email');
        router.push('/signin');
    };

    const checkAuth = () => {
        const token = storage.get('token');
        const email = storage.get('email');
        if (token && email) {
            currentUser.value = { email, token };
            isLoggedIn.value = true;
        }
    };

    return { isLoggedIn, currentUser, loading, signIn, signUp, signOut, checkAuth };
});
