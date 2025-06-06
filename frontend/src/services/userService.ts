import axios from "axios";
import type { NewUser } from "../types/User";

export const createUserInMongoDB = async (userData: NewUser) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/users`,
    userData
  );
  return data;
};
