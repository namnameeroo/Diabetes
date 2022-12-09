import React from "react";
/* eslint-disable-next-line*/
import { useState, useEffect } from "react";
// import { getUser } from "api/user";
import { useNavigate } from "react-router-dom";
import Auth from "components/auth";

const RedirectPage = handleLogin => {
  // const [init, setInit] = useState(false);

  /* eslint-disable-next-line*/
  const [isAdmin, setIsAdmin] = useState(false);
  const handleSetIsAdmin = role => {
    console.log("handle set is admin");
    if (role) {
      setIsAdmin(role);
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
