import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "pages/login";
import FoodFormPage from "pages/foodForm";
import MylistPage from "pages/mylist";
import AdminUserListPage from "pages/adminUserList";

/* eslint-disable*/
const AppRouter = ({ isLoggedIn }) => {
  // const HandlerRedirectCallback = () => {
  // }

  return (
    <div>
      <Routes>
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/foodForm" element={<FoodFormPage />} />
        <Route path="/mylist" element={<MylistPage />} />
        <Route path="/adminUserList" element={<AdminUserListPage />} />
        <Route path="/login/redirect" element={<MylistPage />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
