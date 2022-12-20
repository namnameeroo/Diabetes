import React from "react";

import { Routes, Route } from "react-router-dom";
import LoginPage from "pages/login";
import FoodFormPage from "pages/foodForm";
import MylistPage from "pages/mylist";
import RedirectPage from "pages/redirect";
import AdminUserListPage from "pages/adminUserList";

/* eslint-disable*/
const AppRouter = () => {
  return (
    <div>
      {/* {console.log("router의 현재 로그인 상태값: ", isLoggedIn) } */}
      <Routes>
        <Route path="/" exact element={<LoginPage />} />
        <Route path="/login" exact element={<LoginPage />} />

        <Route path="/foodForm" element={<FoodFormPage />} />
        <Route path="/foodForm/:foodId" element={<FoodFormPage />} />
        <Route path="/mylist" element={<MylistPage />} />
        <Route path="/adminUserList" element={<AdminUserListPage />} />
        <Route path="/login/redirect" element={<RedirectPage />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
