import type { LoginForm, User } from "../interfaces";
const BASE_URL = '/api/auth';

export async function login(loginForm: LoginForm): Promise<{user: User, accessToken: string}> {
    const response = await fetch('http://localhost:3000/users/login', {
        method: "POST",
        body: JSON.stringify(loginForm),
        headers: {
            'Content-Type': 'application/json',
            'credentials': 'include'
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw await response.json();
    }
}

// export async function logout(id: string) {
//     console.log("id : "+id);
    
//     if(!id) throw new Error('No user to logout');
//     await fetch(`http://localhost:3000/users/${id}/logout`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     });
// }