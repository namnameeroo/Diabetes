import React from "react";
import { createContext, useState } from "react";

export const UserContext = createContext({
  info: { email: "", role: "", auth: false },
  setUser: () => {}
});

// const UseUserContext = () => useContext(UserContext);

export const CurrentUserProvider = ({ children }) => {
  const setUser = user => {
    console.log("setting context");
    console.log(user.info);
    setState({ ...state, user: user });
  };

  const initState = {
    info: { email: "", role: "", auth: false },
    setUser: setUser
  };

  const [state, setState] = useState(initState);
  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
