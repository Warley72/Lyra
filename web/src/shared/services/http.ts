const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333/api";

type ApiErrorResponse = { error?: string };

export async function http<T>( path: string, options: RequestInit = {},): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: { "Content-Type": "application/json", ...options.headers },
    });

    if (!response.ok) {
        const body = (await response
            .json()
            .catch(() => ({}))) as ApiErrorResponse;
        throw new Error(body.error ?? "Não foi possível concluir a operação.");
    }

    if (response.status === 204) return undefined as T;
    return response.json() as Promise<T>;
}

export function withAuth(token: string): HeadersInit {
    return { Authorization: `Bearer ${token}` };
}
