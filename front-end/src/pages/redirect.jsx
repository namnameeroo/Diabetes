import React from "react";
import { useState } from "react";
/* eslint-disable-next-line*/
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Auth from "components/auth";

const RedirectPage = ({ handleLogin, isLoggedIn }) => {
  // const [init, setInit] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentLoggedIn, setCurrentLoggedIn] = useState(isLoggedIn);
  // const [currentUser, setCurrentUser] = useState(isLoggedIn);
  console.log("로그인 여부 in redirectPage: ", isLoggedIn);
  /**
   * 어드민
   * @param {Boolean} role
   */
  const handleSetIsAdmin = bool => {
    if (bool) {
      console.log("set is admin");
      setIsAdmin(bool);
    } else {
      setIsAdmin(false);
      console.log("set is not admin");
    }
  };
  const handleCurrentLogin = bool => {
    if (bool) {
      setCurrentLoggedIn(true);
      handleLogin(true);
    } else {
      setCurrentLoggedIn(false);
      handleLogin(false);
    }
  };
  return (
    <>
      <Auth
        handleCurrentLogin={handleCurrentLogin}
        handleSetIsAdmin={handleSetIsAdmin}
      />
      {/* {isLoggedIn
        ? isAdmin
          ? navigate("/adminUserList")
          : navigate("/mylist")
        : navigate("/")} */}
      {/* // {isAdmin ? navigate("/adminUserList") : navigate("/mylist")} */}
      {console.log("왜>!", currentLoggedIn)};
      {currentLoggedIn ? (
        isAdmin ? (
          <Navigate to="/adminUserList" replace={true} />
        ) : (
          <Navigate to="/mylist" replace={true} />
        )
      ) : (
        <Navigate to="/login" replace={true} />
      )}
      <div>유저 이름 : {"빈값"}</div>
      <div>유저 이름 : {"hi"}</div>
    </>
  );
};
export default RedirectPage;
