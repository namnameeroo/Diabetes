import React from "react";
import { useState } from "react";
/* eslint-disable-next-line*/
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Auth from "components/auth";

const RedirectPage = ({ handleLogin, isLoggedIn }) => {
  // const [init, setInit] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  /**
   * 어드민
   * @param {Boolean} role
   */
  const handleSetIsAdmin = bool => {
    if (bool) {
      console.log("handle set is admin");
      setIsAdmin(bool);
    } else {
      setIsAdmin(false);
      console.log("handle set is not admin");
    }
  };
  return (
    <>
      <Auth handleLogin={handleLogin} handleSetIsAdmin={handleSetIsAdmin} />
      {/* {isLoggedIn
        ? isAdmin
          ? navigate("/adminUserList")
          : navigate("/mylist")
        : navigate("/")} */}
      {/* // {isAdmin ? navigate("/adminUserList") : navigate("/mylist")} */}
      {isLoggedIn ? (
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
