/* eslint-disable no-useless-catch */
import type { User, UserForm } from "../interfaces/User.interface";

// const BASE_URL = '/users/login';

export async function createUser(userForm: UserForm) {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(userForm),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      throw await response.json();
    }
  } catch (e) {
    throw e;
  }
}

export async function fetchCurrentUser(): Promise<User | null> {
  const token = localStorage.getItem("user-token");
  if (!token) {
    return null;
  }
  try {
    const res = await fetch("http://localhost:3000/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    } else {
      return null;
    }
  } catch (e) {
    throw e;
  }
}
