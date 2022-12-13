import React from "react";
/* eslint-disable-next-line*/
import { Navigate } from "react-router-dom";

import Auth from "components/auth";

const RedirectPage = ({ isLoggedIn }) => {
  // const [init, setInit] = useState(false);
  // const [currentUser, setCurrentUser] = useState(isLoggedIn);
  console.log("로그인 여부 in redirectPage: ", isLoggedIn);
  /**
   * 어드민
   * @param {Boolean} role
   */

  return (
    <>
      <Auth />

      {/* {isLoggedIn
        ? isAdmin
          ? navigate("/adminUserList")
          : navigate("/mylist")
        : navigate("/")} */}
      {/* // {isAdmin ? navigate("/adminUserList") : navigate("/mylist")} */}

      <div>유저 이름 : {"빈값"}</div>
      <div>유저 이름 : {"hi"}</div>
    </>
  );
};
export default RedirectPage;
