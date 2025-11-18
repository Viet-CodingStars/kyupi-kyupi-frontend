// TODO: Refactor, avoid duplication

export type DatingIntention =
  | "long_term_partner"
  | "long_term_open_to_short"
  | "short_term_open_to_long"
  | "short_term_fun"
  | "new_friends"
  | "still_figuring_out";

export type User = {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  birth_date?: string;
  gender?: 1 | 2 | 3;
  target_gender?: 1 | 2 | 3;
  intention?: DatingIntention;
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
  birth_date: string; // YYYY-MM-DD, must be 18+
  gender: 1 | 2 | 3; // 1=male, 2=female, 3=other
  target_gender: 1 | 2 | 3; // 1=male, 2=female, 3=other
  intention: DatingIntention; // defaults to still_figuring_out
};
