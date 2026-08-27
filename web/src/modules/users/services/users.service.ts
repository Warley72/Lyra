import { http, withAuth } from "@/shared/services/http";
import type { User, UserInput } from "../types/user";

export function createUser(data: UserInput): Promise<User> {
  return http<User>("/users", { method: "POST", body: JSON.stringify(data) });
}

export function getUsers(token: string): Promise<User[]> {
  return http<User[]>("/users", { headers: withAuth(token) });
}

export function updateUser(id: number, data: Partial<UserInput>, token: string): Promise<User> {
  return http<User>(`/users/${id}`, {
    method: "PUT",
    headers: withAuth(token),
    body: JSON.stringify(data),
  });
}

export function deleteUser(id: number, token: string): Promise<void> {
  return http<void>(`/users/${id}`, { method: "DELETE", headers: withAuth(token) });
}
