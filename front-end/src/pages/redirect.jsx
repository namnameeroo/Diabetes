import React from "react";
import { useState } from "react";
/* eslint-disable-next-line*/
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "components/auth";

const RedirectPage = ({ handleLogin }) => {
  // const [init, setInit] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  /**
   * 어드민
   * @param {*} role
   */
  const handleSetIsAdmin = bool => {
    console.log("handle set is admin");
    if (bool) {
      setIsAdmin(bool);
    }
  };
  const navigate = useNavigate();
  const redirect = url => {
    if (url) {
      navigate(url);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Auth handleLogin={handleLogin} handleSetIsAdmin={handleSetIsAdmin} />
      {isAdmin ? redirect("/adminUserList") : redirect("/mylist")}
      <div>유저 이름 : {"빈값"}</div>
      <div>유저 이름 : {"hi"}</div>
    </>
  );
};
export default RedirectPage;
