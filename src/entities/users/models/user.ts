type Gender = "male" | "female" | "other";

type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  gender: Gender;
  birthdate: Date;
  bio: string;
  avatarUrl: string;
};

type SigninUser = Pick<User, "email" | "password">;

export type { User, SigninUser };
