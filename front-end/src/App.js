import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import AppRouter from "components/router";
// import Auth from "components/auth";

import "styles/main.css";

import { CurrentUserProvider, UserContext } from "components/userContext";
// export const LogginContext = createContext();

function App() {
  /* eslint-disable*/
  // const User = useContext(UserContext);
  // const [UserInfo, setUserInfo] = useState(initialUser.info);
  const user = useContext(UserContext);

  console.log("🚀 ~ file: App.js:17 ~ App ~ User", user);

  return (
    <div>
      <CurrentUserProvider value={user}>
        {/* <Auth /> */}
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
            <Link to="/login/redirect"> 리다이렉트 페이지로</Link>
          </li>
        </div>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
