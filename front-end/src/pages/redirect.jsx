import React from "react";
import { Navigate } from "react-router-dom";

// import Auth from "components/auth";

import { useContext } from "react";
import { UserContext } from "components/userContext";

const RedirectPage = () => {
  const { user } = useContext(UserContext); // !important

  return (
    <>
      {/* <Auth /> */}
      <div style={{ height: "50px" }}>
        유저 이름 : {user ? user.info.email : null}
      </div>
      <div style={{ height: "50px" }}>유저 이름 : {"redirect"}</div>

      {/* 로그인 안 한 상태면, 로그인 페이지로
          한 상태면 role에 따라 분기처리
      */}

      {user.info.auth ? (
        user.info.role == "USER" ? (
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
