import React from "react";
import { UserDTO } from "../dtos/UserDTO";

export type AuthContextData = {
  signed: boolean;
  user: UserDTO;
  setSigned: React.Dispatch<React.SetStateAction<boolean>>;
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
  const value = {
    signed: true,
    user: {
      id: "1",
      avatar: "",
      name: "John Doe",
      email: "john@gmail.com",
      tel: "",
    },
    setSigned,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
