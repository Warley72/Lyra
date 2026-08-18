const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333/api";

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserInput {
  name: string;
  email: string;
  password: string;
}

type ApiErrorResponse = { error?: string };

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as ApiErrorResponse;
    throw new Error(body.error ?? "Não foi possível concluir a operação.");
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

function withAuth(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

export function createUser(data: UserInput): Promise<User> {
  return request<User>("/users", { method: "POST", body: JSON.stringify(data) });
}

export function login(email: string, password: string): Promise<{ token: string }> {
  return request<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function getUsers(token: string): Promise<User[]> {
  return request<User[]>("/users", { headers: withAuth(token) });
}

export function updateUser(id: number, data: Partial<UserInput>, token: string): Promise<User> {
  return request<User>(`/users/${id}`, {
    method: "PUT",
    headers: withAuth(token),
    body: JSON.stringify(data),
  });
}

export function deleteUser(id: number, token: string): Promise<void> {
  return request<void>(`/users/${id}`, { method: "DELETE", headers: withAuth(token) });
}
