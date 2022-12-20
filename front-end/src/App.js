import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import AppRouter from "components/router";
import "styles/main.css";
import { CurrentUserProvider, initialUser } from "components/userContext";
// export const LogginContext = createContext();

function App() {
  /* eslint-disable*/
  // const User = useContext(UserContext);

  const [UserInfo, setUserInfo] = useState(initialUser.info);
  const value = { info: UserInfo, setUser: setUserInfo };

  console.log(UserInfo);

  return (
    <div>
      <CurrentUserProvider value={value}>
        <div id="main-card">
          <AppRouter />
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
      </CurrentUserProvider>
    </div>
  );
}

export default App;
