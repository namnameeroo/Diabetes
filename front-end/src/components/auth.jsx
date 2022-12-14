/* User 정보 들고 있는 컴포*/
import React from "react";
import axios from "axios";
// import { Navigate } from "react-router-dom";

import { useEffect } from "react";
import { useState } from "react";
import Utils from "utils";

/**
 * 유저 정보 가져와서 로그인 처리
 * App.js 로부터 전달받은 상태관리 함수
 */
const Auth = () => {
  /* eslint-disable-next-line*/
  const [errorMsg, setErrorMsg] = useState("Auth 실패");

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  /* eslint-disable-next-line*/
  useEffect(() => {
    const getUser = async () => {
      console.log("getUser inner");
      try {
        await axios
          .get(Utils.baseUrl + `/api/v1/users/me`, {
            withCredentials: true
          })
          .then(res => {
            console.log(res.data.result);
            setIsAdmin(res.data.result.role == "ADMIN" && true);
            setIsLogin(true);
            if (isAdmin) {
              location.replace(Utils.baseUrl + `/adminUserList`);
            } else if (isLogin) {
              location.replace(Utils.baseUrl + `/mylist`);
            }
          });
      } catch (error) {
        console.error(error);
        location.replace(Utils.baseUrl + `login`);
        setIsAdmin(false);
        setIsLogin(false);
        location.replace(Utils.baseUrl + `/login`);
      }
    };

    getUser();
  }, []);

  return (
    <>
      {/* {isLogin ? (
        isAdmin ? (
          <Navigate to="/adminUserList" replace={true} />
        ) : (
          <Navigate to="/mylist" replace={true} />
        )
      ) : (
        <Navigate to="/foodForm" replace={true} />
      )} */}
    </>
  );
};
export default Auth;
