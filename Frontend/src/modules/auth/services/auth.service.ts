import { http, withAuth } from "@/shared/services/http";

const TOKEN_KEY = "lyra.auth.token";

export function login( email: string, password: string,): Promise<{ token: string }> {
    return http<{ token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
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
