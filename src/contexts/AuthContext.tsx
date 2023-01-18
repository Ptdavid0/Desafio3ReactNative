import React from "react";
import { UserDTO } from "../dtos/UserDTO";
import api from "../service/api";

export type AuthContextData = {
  signed: boolean;
  user: UserDTO;
  setSigned: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
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
      console.log(data);
      setUser(data.user);
      setSigned(true);
    } catch (err) {
      throw err;
    }
  };

  const signOut = () => {
    setUser({} as UserDTO);
    setSigned(false);
  };

  const value = {
    signed,
    user,
    signIn,
    setSigned,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
