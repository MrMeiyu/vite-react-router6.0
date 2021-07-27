export type Role = "guest" | "admin";

export interface LoginParams {
  userName: string;
  password: string;
  token: string;
}

export interface LoginResult {
  token: string;
  userName: string;
  role: Role;
}
