import { createContext, useEffect, useState, type ReactNode } from "react";
import { getUser } from "../services/usuarios.services";
import { IUser } from "../interfaces/IUsuario";

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const UserContext = createContext<IUserContext | null>(null);

interface IUserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: IUserContextProviderProps) {
  const [user, setUser] = useState<IUser | null>(getUser());

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
