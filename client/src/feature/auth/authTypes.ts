export type Role = "user" | "admin";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface RegisterRequestDto {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponseDto {
  user: User;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  user: User;
}

export type MeResponseDto = User;
