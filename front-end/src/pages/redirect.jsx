import React from "react";

import Auth from "components/auth";

// import { useState } from "react";
// import { UserContext } from "components/userContext";

const RedirectPage = () => {
  // const { user } = useContext(UserContext); // !important
  // if (currentUser != user) {
  //   setCurrentUser(user);
  // }

  return (
    <>
      <Auth />

      <div style={{ height: "50px" }}>
        []
        {/* 유저 이름 : {currentUser ? currentUser.email : null} */}
      </div>
      <div style={{ height: "50px" }}>유저 이름 : {"redirect"}</div>

      {/* 로그인 안 한 상태면, 로그인 페이지로
          한 상태면 role에 따라 분기처리
      */}
      {/*       
      {user.auth ? (
        user.role == "USER" ? (
          <Navigate to="/mylist" />
        ) : (
          <Navigate to="/adminUserList" />
        )
      ) : (
        <Navigate to="/login" />
      )} */}
    </>
  );
};
export default RedirectPage;
