import React from "react";
import { UserDTO } from "../dtos/UserDTO";
import api from "../service/api";

export type AuthContextData = {
  signed: boolean;
  user: UserDTO;
  setSigned: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: (email: string, password: string) => Promise<void>;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext({} as AuthContextData);

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = React.useState<UserDTO>({} as UserDTO);
  const [signed, setSigned] = React.useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/sessions", { email, password });
      setUser(data.user);
      setSigned(true);
    } catch (err) {
      throw err;
    }
  };
  const value = {
    signed,
    user: {
      id: "1",
      avatar: "",
      name: "John Doe",
      email: "john@gmail.com",
      tel: "",
    },
    signIn,
    setSigned,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
