import React from "react";
import { Navigate } from "react-router-dom";

// import Auth from "components/auth";

import { useState, useEffect, useContext } from "react";
import { UserContext } from "components/userContext";

const RedirectPage = () => {
  const [currentUser, setCurrentUser] = useState({
    user: { email: "", role: "", auth: false },
    setUser: () => {}
  });
  const { user } = useContext(UserContext); // !important
  useEffect(() => {
    console.log(
      "🚀 ~ file: redirect.jsx:11 ~ RedirectPage ~ user.auth",
      user.auth
    );
    setCurrentUser(user);
  }, []);

  return (
    <>
      {/* <Auth /> */}
      <div style={{ height: "50px" }}>
        유저 이름 : {currentUser ? currentUser.email : null}
      </div>
      <div style={{ height: "50px" }}>유저 이름 : {"redirect"}</div>

      {/* 로그인 안 한 상태면, 로그인 페이지로
          한 상태면 role에 따라 분기처리
      */}

      {currentUser.auth ? (
        currentUser.role == "USER" ? (
          <Navigate to="/mylist" />
        ) : (
          <Navigate to="/adminUserList" />
        )
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
export default RedirectPage;
