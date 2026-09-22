import { http } from "@/lib/http";

import type {
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from "../types/auth.types";

const TOKEN_KEY = "lyra.auth.token";

export function login(email: string, password: string): Promise<LoginResponse> {
    return http<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export function register(data: RegisterRequest): Promise<RegisterResponse> {
    return http<RegisterResponse>("/users", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function saveAuthToken(token: string): void {
    window.localStorage.setItem(TOKEN_KEY, token);
}

export function getAuthToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
}

export function clearAuthToken(): void {
    window.localStorage.removeItem(TOKEN_KEY);
}

export async function validateAuthToken(token: string): Promise<void> {
    await http("/users", { headers: withAuth(token) });
}

function withAuth(token: string): HeadersInit {
    return { Authorization: `Bearer ${token}` };
}
