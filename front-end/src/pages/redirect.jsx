import React from "react";
import { useState, useEffect } from "react";
import { getUser } from "api/user";
// import Auth from "components/auth";

const RedirectPage = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  // useEffect(() => {
  // setIsLoggedin(true);
  // }, []);
  function callbackFunc(res) {
    console.log(res);
  }
  useEffect(() => {
    try {
      console.log("here");
      getUser(callbackFunc);
      // .then(res => {
      // const userData = {
      //   ["userId"]: res.result.userId,
      //   ["userEmail"]: res.result.userEmail
      // };
      // Auth.setUser(userData);
      setIsLoggedin(true);
      // });
    } catch (error) {
      console.error();
    }
  }, []);

  return (
    <>
      {isLoggedin ? (
        <>
          <div>유저 이름 : {"hi"}</div>
          <div>유저 이름 : {"hi"}</div>
        </>
      ) : (
        "로그인 실패"
      )}
    </>
  );
};
export default RedirectPage;
