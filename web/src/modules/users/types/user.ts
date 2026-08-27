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
