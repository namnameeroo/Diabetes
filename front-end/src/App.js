import React from "react";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

import AppRouter from "components/router";
import "styles/main.css";
import { Link } from "react-router-dom";

export const UserContext = createContext();

// export const LogginContext = createContext();

function App() {
  /* eslint-disable*/
  const initialUser = { email: "", role: "", auth: false };
  const User = useContext(UserContext);
  const [Login, setLogin] = useState(false);
  useEffect(() => {
    try {
      if (User.email && User.auth) {
        console.log(
          "🚀 ~ file: App.js:19 ~ LoginState ~  User.auth",
          User.auth
        );
        setLogin(true);
      } else {
        setLogin(false);
      }
    } catch (error) {
      setLogin(false);
      console.error(error);
    }
  }, User);

  return (
    <div>
      <UserContext.Provider value={initialUser}>
        <div id="main-card">
          <AppRouter Login={Login} />
        </div>

        <div className="link-for-test">
          <li>
            <Link to="/login">로그인페이지로</Link>
          </li>
          <li>
            <Link to="/foodForm">입력페이지로</Link>
          </li>
          <li>
            <Link to="/mylist">입력목록 페이지로</Link>
          </li>
          <li>
            <Link to="/adminUserList">(어드민) 유저목록 페이지로</Link>
          </li>
          <li>
            <Link to="/login/redirect">(어드민) 리다이렉트 페이지로</Link>
          </li>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
