import { useUser } from "../stores";

export function isAuthenticatedGuard() {
    const userStore = useUser();
    if (!userStore.isAuthenticated) {
        return '/connexion';
    }
}

export function isNotAuthenticatedGuard() {
    const userStore = useUser();
    try {
        userStore.fetchCurrentUser();
        if (userStore.isAuthenticated) {
            return false;
        }

        
    } catch (error) {
        return true;
    }
}