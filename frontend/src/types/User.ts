export interface NewUser {
  uid: string;
  email: string;
  displayName: string;
}

export interface User extends NewUser {
  token?: string;
}