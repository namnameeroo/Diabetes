/* User 정보 들고 있는 컴포*/
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
// import { Redirect } from "react-router-dom";

import Utils from "utils";

const Auth = ({ handleLogin, handleSetIsAdmin }) => {
  /* eslint-disable-next-line*/

  /* eslint-disable-next-line*/
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* eslint-disable-next-line*/
  const [errorMsg, setErrorMsg] = useState("Auth 실패");

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
            handleSetIsAdmin(res.data.result.role == "ADMIN" && true);
            console.log(res.data.result.role);
            handleLogin(true);
          });
      } catch (error) {
        handleLogin(false);
        console.error(error);
      }
    };
    getUser();
  }, []);

  return <></>;
};

export default Auth;
