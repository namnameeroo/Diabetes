import React from "react";
import { redirect } from "react-router-dom";
/* eslint-disable-next-line*/
import { useState, useEffect } from "react";
// import { getUser } from "api/user";
import Auth from "components/auth";

const RedirectPage = () => {
  // const [init, setInit] = useState(false);

  /* eslint-disable-next-line*/
  const [isLoggedin, setIsLoggedin] = useState(false);
  const handleRedirect = role => {
    if (role) {
      role == "ADMIN" ? redirect("/adminUserList") : redirect("/mylist");
    } else {
      redirect("/login");
    }
  };

  return (
    <>
      <Auth handleRedirect={handleRedirect} />
      <div>유저 이름 : {"빈값"}</div>
      <div>유저 이름 : {"hi"}</div>
    </>
  );
};
export default RedirectPage;
