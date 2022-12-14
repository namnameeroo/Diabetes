import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import AppRouter from "components/router";
import Auth from "components/auth";

import "styles/main.css";

import { CurrentUserProvider, UserContext } from "components/userContext";
// export const LogginContext = createContext();

function App() {
  /* eslint-disable*/
  // const User = useContext(UserContext);
  // const [UserInfo, setUserInfo] = useState(initialUser.info);
  const user = useContext(UserContext);

  console.log("๐ ~ file: App.js:17 ~ App ~ User", user);

  return (
    <div>
      <CurrentUserProvider value={user}>
        <Auth />
        <div id="main-card">
          <AppRouter />
        </div>

        <div className="link-for-test">
          <li>
            <Link to="/login">๋ก๊ทธ์ธํ์ด์ง๋ก</Link>
          </li>
          <li>
            <Link to="/foodForm">์๋ ฅํ์ด์ง๋ก</Link>
          </li>
          <li>
            <Link to="/mylist">์๋ ฅ๋ชฉ๋ก ํ์ด์ง๋ก</Link>
          </li>
          <li>
            <Link to="/adminUserList">(์ด๋๋ฏผ) ์ ์ ๋ชฉ๋ก ํ์ด์ง๋ก</Link>
          </li>
          <li>
            <Link to="/login/redirect"> ๋ฆฌ๋ค์ด๋ ํธ ํ์ด์ง๋ก</Link>
          </li>
        </div>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
