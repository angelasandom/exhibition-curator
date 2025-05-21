import type { User as FirebaseUser } from "firebase/auth";

export default interface UserContextType {
  user: FirebaseUser | null;
  loading: boolean;
  logout: () => void;
  login: (userData: FirebaseUser) => void;
}
