/* User 정보 들고 있는 컴포*/
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Utils from "utils";

/**
 * 유저 정보 가져와서 로그인 처리
 * App.js 로부터 전달받은 상태관리 함수
 * @param {*} param0
 * @returns
 */
const Auth = ({ handleCurrentLogin, handleSetIsAdmin }) => {
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

            console.log(res.data.result);
            handleCurrentLogin(true);
          });
      } catch (error) {
        console.error(error);
        handleCurrentLogin(false);
      }
    };

    getUser();
  }, []);

  return <></>;
};

export default Auth;
