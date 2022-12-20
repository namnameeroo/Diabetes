import React from "react";
import { createContext, useContext } from "react";

const initialUser = {
  info: { email: "", role: "", auth: false },
  setUser: () => {}
};

const UserContext = createContext(initialUser);

const UseUserContext = () => useContext(UserContext);

const CurrentUserProvider = ({ value, children }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { CurrentUserProvider, UseUserContext, initialUser, UserContext };
