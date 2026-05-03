import { createContext, useEffect, useState, type ReactNode } from "react";
import { logout, type IUser } from "../servicios/usuarios.services";

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const UserContext = createContext<IUserContext | null>(null);

interface IUserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: IUserContextProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    logout();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
