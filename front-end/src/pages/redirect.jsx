import React from "react";
/* eslint-disable-next-line*/
import Auth from "components/auth";

const RedirectPage = ({ isLoggedIn }) => {
  console.log("로그인 여부 in redirectPage: ", isLoggedIn);
  return (
    <>
      <Auth />
      <div>유저 이름 : {"2022-12-14"}</div>
      <div>유저 이름 : {"redirect"}</div>
    </>
  );
};
export default RedirectPage;
