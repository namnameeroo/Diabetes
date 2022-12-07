import React from "react";
import { useState, useEffect } from "react";
// import { getUser } from "api/user";
import Auth from "components/auth";

const RedirectPage = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  // useEffect(() => {
  // setIsLoggedin(true);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        Auth.getUser();

        // .then(res => {
        // const userData = {
        //   ["userId"]: res.result.userId,
        //   ["userEmail"]: res.result.userEmail
        // };

        setIsLoggedin(true);
        // });
      } catch (error) {
        console.error();
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoggedin ? (
        <>
          <div>유저 이름 : {"hi"}</div>
          <div>유저 이름 : {"hi"}</div>
          <Auth />
        </>
      ) : (
        "로그인 실패"
      )}
    </>
  );
};
export default RedirectPage;
