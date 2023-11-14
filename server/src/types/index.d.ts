export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string | null;
  isLogin: boolean;
};
