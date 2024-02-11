export type User = {
  username: string;
  email: string;
  role: number;
  exp: number;
  credits: number;
  token: string;
};

export const emptyUser = {
  username: '',
  email: '',
  role: 0,
  exp: 0,
  credits: 0,
  token: '',
};
