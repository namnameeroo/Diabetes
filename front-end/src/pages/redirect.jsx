import React from "react";
/* eslint-disable-next-line*/
import { useState, useEffect } from "react";
// import { getUser } from "api/user";
import Auth from "components/auth";

const RedirectPage = () => {
  // const [init, setInit] = useState(false);

  /* eslint-disable-next-line*/
  const [isLoggedin, setIsLoggedin] = useState(false);

  return (
    <>
      {/* {init ? <MylistPage isLoggedin={isLoggedin} User={User} /> : "initializing..."} */}
      <Auth />
      {/* home nav 추가 */}
      <div>유저 이름 : {"빈값"}</div>
      <div>유저 이름 : {"hi"}</div>
    </>
  );
};
export default RedirectPage;
