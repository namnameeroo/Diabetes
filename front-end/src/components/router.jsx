import React from "react";
// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "pages/login";
import FoodFormPage from "pages/foodForm";
import MylistPage from "pages/mylist";
import RedirectPage from "pages/redirect";
import AdminUserListPage from "pages/adminUserList";
import { useContext } from "react";
import { UserContext } from "./userContext";

/* eslint-disable*/
const AppRouter = () => {
  // const [role, setRole] = useState(value);
  const { user } = useContext(UserContext); // !important
  // user.info.auth

  return (
    <div>
      {/* {console.log("router의 현재 로그인 상태값: ", isLoggedIn) } */}
      <Routes>
        <Route path="/login/redirect" element={<RedirectPage />} />
        <Route path="/" exact element={<LoginPage />} />
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/foodForm" element={<FoodFormPage />} />
        <Route path="/foodForm/info/:foodId" element={<FoodFormPage />} />
        {/* <Route path="/foodForm/edit/:foodId" element={<FoodFormPage />} /> */}
        <Route path="/mylist" element={<MylistPage />} />
        <Route path="/adminUserList" element={<AdminUserListPage />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
