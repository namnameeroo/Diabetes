import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "pages/login";
import FoodFormPage from "pages/foodForm";
import MylistPage from "pages/mylist";
import RedirectPage from "pages/redirect";
import AdminUserListPage from "pages/adminUserList";

/* eslint-disable*/
const AppRouter = ({ isLoggedIn, handleLogin }) => {
  // const HandlerRedirectCallback = () => {
  // }

  return (
    <div>
      <Routes>
        <Route path="/" exact element={<LoginPage isLoggedIn={isLoggedIn} />} />
        <Route
          path="/login"
          exact
          element={<LoginPage isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/foodForm"
          element={<FoodFormPage isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/foodForm/:foodId"
          element={<FoodFormPage isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/mylist"
          element={<MylistPage isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/adminUserList"
          element={<AdminUserListPage isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/login/redirect"
          element={
            <RedirectPage isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
          }
        />
      </Routes>
    </div>
  );
};

export default AppRouter;
