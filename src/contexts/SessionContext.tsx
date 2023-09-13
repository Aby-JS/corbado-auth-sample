import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import Corbado from "@corbado/webcomponent";
import { getBearerTokenFromCookie } from "../utils/Auth/utilities";
import { useNavigate } from "react-router-dom";

interface SessionContextProps {
  isLoggedIn: boolean;
  token: string;
  user?: Record<string, string>;
  logout: () => void;
}

const SessionContext = createContext<SessionContextProps>({
  isLoggedIn: false,
  token: "",
  logout: () => {},
});

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const session = new Corbado.Session("pro-503401103218055321");

  useEffect(() => {
    session.refresh((user: any) => {
      if (!user) {
        logout();
      } else {
        login(user);
      }
    });
    setToken(getBearerTokenFromCookie() ?? "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (user: any) => {
    setIsLoggedIn(true);
    setUser(user);
    navigate("/");
  };

  const logout = () => {
    session
      .logout()
      .then(() => {
        setIsLoggedIn(false);
        navigate("/login");
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  return (
    <SessionContext.Provider value={{ isLoggedIn, token, user, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
