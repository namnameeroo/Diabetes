import React from "react";
import {Routes, Route} from "react-router-dom";

import LoginPage from "pages/login";
import FoodFormPage from "pages/foodForm";
import MylistPage from "pages/mylist";
import AdminUserListPage from "pages/adminUserList";

const AppRouter = ({isLoggedIn}) => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/foodForm" element={<FoodFormPage />} />
        <Route path="/mylist" element={<MylistPage />} />
        <Route path="/adminUserList" element={<AdminUserListPage />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
