/* User 정보 들고 있는 컴포*/
import axios from "axios";
import { useState } from "react";
import Utils from "utils";

const Auth = () => {
  /* eslint-disable-next-line*/
  const [isAdmin, setIsAdmin] = useState(false);
  /* eslint-disable-next-line*/
  const [User, setUser] = useState({});
  // const [errorMsg, setErrorMsg] = useState("Auth 실패");

  /* eslint-disable-next-line*/
  const getUser = async () => {
    console.log("getUser inner");
    await axios
      .get(Utils.baseUrl + `/api/v1/users/me`, {
        withCredentials: true
      })
      .then(res => {
        console.log(res);
        // setUser(props.id)
        // console.log("auth component,", User);
      });
    console.log("getUser done");
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (isUser) {
  //     // Login Success, route
  //   } else {
  //     // home 화면 돌아가기
  //   }
  // };
  // return <div></div>;
};

export default Auth;
