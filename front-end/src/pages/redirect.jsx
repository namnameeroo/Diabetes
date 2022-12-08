import React from "react";
/* eslint-disable-next-line*/
import { useState, useEffect } from "react";
// import { getUser } from "api/user";
import Auth from "components/auth";

const RedirectPage = () => {
  // const [init, setInit] = useState(false);

  /* eslint-disable-next-line*/
  const [isLoggedin, setIsLoggedin] = useState(false);
  // const [isAdmin, setIsAdmin] = useState({
  // role: ""
  // });

  // useEffect(() => {
  //   Auth.loginUser(res => {
  //     if (res) {
  //       setIsLoggedin(true);
  //       console.log("auth 응답값", res);
  //       // admin 처리 해서 라우트
  //     } else {
  //       setIsLoggedin(false);
  //     }
  //   });
  // }, []);

  return (
    <>
      {/* {init ? <MylistPage isLoggedin={isLoggedin} User={User} /> : "initializing..."} */}
      {isLoggedin && "로그인 성공-!"}
      {/* home nav 추가 */}
      <Auth />
      <div>유저 이름 : {"빈값"}</div>
      <div>유저 이름 : {"hi"}</div>
    </>
  );
};
export default RedirectPage;
