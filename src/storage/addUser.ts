import axios from "axios";
import api from "../service/api";

interface UserData {
  avatar: any;
  name: string;
  email: string;
  tel: string;
  password: string;
}

export const addUser = async ({
  avatar,
  name,
  email,
  tel,
  password,
}: UserData) => {
  try {
    const user = new FormData();
    user.append("avatar", avatar);
    user.append("name", name);
    user.append("email", email);
    user.append("tel", tel);
    user.append("password", password);
    const response = await api.post("/users", user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response) return true;
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
    return false;
  }
};
