// TODO: Refactor, avoid duplication

export type User = {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  birth_date?: string;
  gender?: string;
  created_at: string;
  updated_at: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  email: string;
  name: string;
  password: string;
};
