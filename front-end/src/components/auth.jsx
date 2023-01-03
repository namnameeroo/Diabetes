/* User 정보 들고 있는 컴포*/
import React from "react";
import axios from "axios";
// import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "components/userContext";
import { useState, useEffect } from "react";

import Utils from "utils";

/**
 * 유저 정보 가져와서 로그인 처리
 * App.js 로부터 전달받은 상태관리 함수
 */

const Auth = () => {
  /* eslint-disable-next-line*/
  const [errorMsg, setErrorMsg] = useState("Auth 실패");
  const USER = { email: "", role: "", auth: false };
  const user = useContext(UserContext);
  user.setUser("test plz");

  const [redirectUrl, setRedirectUrl] = useState(Utils.baseUrl);
  /* eslint-disable-next-line*/
  const { info, setUser } = useContext(UserContext);
  console.log("🚀 ~ file: auth.jsx:25 ~ Auth ~ info", info);

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
            const data = res.data.result;
            console.log(res.data.result);
            // setIsAdmin(res.data.result.role == "ADMIN" && true);

            console.log("🚀 ~ file: auth.jsx:32 ~ getUser ~ data", data);

            USER.email = data.email;
            USER.role = data.role;
            USER.auth = true;

            console.log(info);
            setUser({ info: USER });

            if (data.role == "ADMIN") {
              setRedirectUrl(Utils.baseUrl + `/adminUserList`);
            } else if (data.role == "USER") {
              setRedirectUrl(Utils.baseUrl + `/adminUserList`);
            }
          });
      } catch (error) {
        console.error(error);
        setRedirectUrl(Utils.baseUrl + `/login`);
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
      {/* <UserContext.Provider value={USER}> */}
      {USER.info}
      {location.replace(redirectUrl)}
      {/* </UserContext.Provider> */}
    </>
  );
};
export default Auth;
