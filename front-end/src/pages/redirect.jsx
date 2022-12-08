import React from "react";
import { redirect } from "react-router-dom";
/* eslint-disable-next-line*/
import { useState, useEffect } from "react";
// import { getUser } from "api/user";
import Auth from "components/auth";

const RedirectPage = () => {
  // const [init, setInit] = useState(false);

  /* eslint-disable-next-line*/
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = user => {
    if (user) {
      setIsLoggedIn(true);
      handleRedirect(user);
    } else {
      setIsLoggedIn(false);
    }
  };
  const handleRedirect = role => {
    if (role) {
      return role == "ADMIN" ? redirect("/adminUserList") : redirect("/mylist");
    } else {
      return redirect("/login");
    }
  };

  return (
    <>
      <Auth handleLogin={handleLogin} />
      <div>유저 이름 : {"빈값"}</div>
      <div>유저 이름 : {"hi"}</div>
    </>
  );
};
export default RedirectPage;
