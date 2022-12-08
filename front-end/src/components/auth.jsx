/* User 정보 들고 있는 컴포*/
// import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

import Utils from "utils";

const Auth = ({ handleRedirect }) => {
  /* eslint-disable-next-line*/
  const [isAdmin, setIsAdmin] = useState(false);
  /* eslint-disable-next-line*/
  const [User, setUser] = useState("");

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
            setIsAdmin(res.data.result.role == "ADMIN" && true);
            console.log(isAdmin && "관리자 계정");
          });
      } catch (error) {
        console.error(error);
        return handleRedirect(false);
      }
      console.log("getUser done");
    };
    getUser();
  }, []);

  return handleRedirect(isAdmin ? "ADMIN" : "USER");
};

export default Auth;
