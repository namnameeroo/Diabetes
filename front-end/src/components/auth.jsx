/* User 정보 들고 있는 컴포*/
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Utils from "utils";

const Auth = () => {
  /* eslint-disable-next-line*/
  const [isAdmin, setIsAdmin] = useState(false);
  /* eslint-disable-next-line*/
  const [User, setUser] = useState({});

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
            console.log("axios 응답값", res);
            setUser(res.result.role);
          });
      } catch (error) {
        console.error(error);
      }
      console.log("getUser done");
    };
    getUser();
  }, []);

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (isUser) {
  //     // Login Success, route
  //   } else {
  //     // home 화면 돌아가기
  //   }
  // };
  // return <div></div>;
  return User;
};

export default Auth;
