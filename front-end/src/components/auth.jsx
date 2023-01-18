/* User 정보 들고 있는 컴포*/
import React from "react";
import axios from "axios";
// import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "components/userContext";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import Utils from "utils";

/**
 * 유저 정보 가져와서 로그인 처리
 * App.js 로부터 전달받은 상태관리 함수
 */

const Auth = () => {
  // const [errorMsg, setErrorMsg] = useState("Auth 실패");
  const USER = { email: "", role: "", auth: false };
  const { user, setUser } = useContext(UserContext);

  /* eslint-disable-next-line*/
  const [redirectUrl, setRedirectUrl] = useState(Utils.baseUrl);

  /* eslint-disable-next-line*/
  useEffect(() => {
    console.log("123");
    const getUser = async () => {
      try {
        await axios
          .get(Utils.baseUrl + `/api/v1/users/me`, {
            withCredentials: true
          })
          .then(res => {
            const data = res.data.result;
            console.log(res.data.result);

            USER.email = data.email;
            USER.role = data.role;
            USER.auth = true;

            console.log("🚀 ~ file: auth.jsx:32 ~ getUser ~ data", data);
            setUser({ user: USER });
            console.log(user);

            if (data.role == "ADMIN") {
              setRedirectUrl(Utils.baseUrl + `/adminUserList`);
            } else if (data.role == "USER") {
              setRedirectUrl(Utils.baseUrl + `/mylist`);
            }
          });
      } catch (error) {
        console.error(error);
        setRedirectUrl(Utils.baseUrl + `/login`);

        USER.email = "user email dummy";
        USER.role = "ADMIN";
        USER.auth = true;
        setUser({ user: USER });

        console.log(USER);
        console.log(user);
      }
    };

    getUser();
  }, [user.email]);

  return (
    <>
      {console.log("row user in auth", USER)}
      {USER.auth ? (
        USER.role == "USER" ? (
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
export default Auth;
