import React from "react";
import { createContext, useState } from "react";

export const UserContext = createContext({
  user: { email: "", role: "", auth: false },
  setUser: () => {}
});

// const UseUserContext = () => useContext(UserContext);

export const CurrentUserProvider = ({ children }) => {
  const setUser = user => {
    console.log("setting context");
    console.log(user.user);
    setState({ ...state, user: user });
  };

  const initState = {
    user: { email: "", role: "", auth: false },
    setUser: setUser
  };

  const [state, setState] = useState(initState);
  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
