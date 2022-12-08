import React from "react";
import { useState } from "react";
import AppRouter from "components/router";
import "styles/main.css";
import { Link } from "react-router-dom";

function App() {
  /* eslint-disable*/
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div>
      <div id="main-card">
        <AppRouter isLoggedIn={isLoggedIn} />
      </div>

      <div className="temp">
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
      </div>
    </div>
  );
}

export default App;
