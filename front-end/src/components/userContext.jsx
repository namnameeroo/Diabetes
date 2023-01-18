import React from "react";
import { createContext, useState } from "react";

export const UserContext = createContext({
  user: { email: "", role: "", auth: false },
  setUser: () => {}
});

// const UseUserContext = () => useContext(UserContext);

export const CurrentUserProvider = ({ children }) => {
  const setUser = newUser => {
    console.log("setting context");
    console.log(
      "🚀 ~ file: userContext.jsx:15 ~ setUser ~ newUser.user",
      newUser.user
    );
    setState({ ...state, user: newUser.user });
  };

  const initState = {
    user: { email: "", role: "", auth: false },
    setUser: setUser
  };

  const [state, setState] = useState(initState);
  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
