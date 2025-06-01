import axios from "axios";

interface NewUser {
  uid: string;
  email: string;
  displayName: string;
}

export const createUserInMongoDB = async (userData: NewUser) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/users`,
    userData
  );
  return data;
};
