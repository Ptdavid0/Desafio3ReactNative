import React, { useEffect, useState } from "react";
import { FilterDTO } from "../dtos/FilterDTO";
import { PhotoFileDTO } from "../dtos/PhotoFileDTO";
import { ProductDTO } from "../dtos/ProductDTO";
import { UserDTO } from "../dtos/UserDTO";
import api from "../service/api";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "../storage/storageAuthToken";
import {
  storageUser,
  storageUserGet,
  storageUserRemove,
} from "../storage/storageUsers";
import { getFilteredProducts } from "../storage/getAllFilteredProducts";

export type AuthContextData = {
  signed: boolean;
  user: UserDTO;
  setSigned: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  allProducts: ProductDTO[];
  setAllProducts: React.Dispatch<React.SetStateAction<ProductDTO[]>>;
  isLoadingUserStorageData: boolean;
  refreshedToken: string;
  allMyProducts: ProductDTO[];
  setAllMyProducts: React.Dispatch<React.SetStateAction<ProductDTO[]>>;
  currentProductImages: PhotoFileDTO[];
  setCurrentProductImages: React.Dispatch<React.SetStateAction<PhotoFileDTO[]>>;
  cleanCurrentProductImages: () => void;
  filterProducts: (filters: FilterDTO) => Promise<void>;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext({} as AuthContextData);

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [signed, setSigned] = useState(false);
  const [allProducts, setAllProducts] = useState<ProductDTO[]>([]);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);
  const [refreshedToken, setRefreshedToken] = useState("");
  const [allMyProducts, setAllMyProducts] = useState<ProductDTO[]>([]);
  const [currentProductImages, setCurrentProductImages] = useState<any[]>([]);

  const userAndTokenUpdate = async (userData: UserDTO, token: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  };

  const cleanCurrentProductImages = () => {
    setCurrentProductImages([]);
  };

  const storageUserAndTokenSave = async (userData: UserDTO, token: string) => {
    try {
      setIsLoadingUserStorageData(true);
      await storageUser(userData);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const filterProducts = async (filters: FilterDTO) => {
    try {
      const products = await getFilteredProducts(filters);
      setAllProducts(products);
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/sessions", {
        email,
        password,
      });
      if (data.user && data.token) {
        console.log(data.token);
        setIsLoadingUserStorageData(true);
        await storageUserAndTokenSave(data.user, data.token);
        userAndTokenUpdate(data.user, data.token);
        setSigned(true);
        setUser(data.user);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const refreshTokenUpdated = async (newToken: string) => {
    setRefreshedToken(newToken);
  };

  const loadUserData = async () => {
    try {
      setIsLoadingUserStorageData(true);

      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (userLogged && token) {
        await userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager({
      signOut,
      refreshTokenUpdated,
    });
    return () => subscribe();
  }, [signOut]);

  const value = {
    signed,
    user,
    signIn,
    setSigned,
    signOut,
    allProducts,
    setAllProducts,
    isLoadingUserStorageData,
    refreshedToken,
    allMyProducts,
    setAllMyProducts,
    currentProductImages,
    setCurrentProductImages,
    cleanCurrentProductImages,
    filterProducts,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
