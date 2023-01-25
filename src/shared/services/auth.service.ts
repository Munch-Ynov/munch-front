import type { LoginForm, User } from "../interfaces";

const BASE_URL = '/api/auth';

export async function login(loginForm: LoginForm): Promise<User> {
    const response = await fetch('http://localhost:3000/users/login', {
        method: "POST",
        body: JSON.stringify(loginForm),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw await response.json();
    }
}

export async function logout() {
    const response = await fetch('http://localhost:3000/users/logout', {
        method: 'DELETE',
        credentials: "include"
    });
}