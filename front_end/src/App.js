import React from "react";
import {Routes, Route, Link} from "react-router-dom";
// import styled from "styled-component";

import LoginPage from "./pages/login";
import MainPage from "./pages/main";
import MylistPage from "./pages/mylist";
import AdminUserListPage from "./pages/adminUserList";

function App() {
  let container = {
    // backgroudColor: "white",
    // width: "40%",
    // margin: "0 auto",
  };

  return (
    <div style={container}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/mylist" element={<MylistPage />} />
        <Route path="/adminUserList" element={<AdminUserListPage />} />
      </Routes>
      <div className="temp">
        <li>
          <Link to="/login">로그인페이지로</Link>
        </li>
        <li>
          <Link to="/main">메인페이지로</Link>
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
