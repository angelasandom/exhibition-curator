import type User from "./User";

export default interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
