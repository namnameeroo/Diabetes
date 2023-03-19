import React from "react";
// import { useState } from "react";
import { createBrowserRouter, Link } from "react-router-dom";

import LoginPage from "pages/LoginPage";
import FoodFormPage from "pages/FoodFormPage";
import MylistPage from "pages/MylistPage";
import RedirectPage from "pages/RedirectPage";
import UserlistPage from "pages/UserlistPage";
// import AuthLayout from "layout/AuthLayout";
const routerData = [
  {
    id: 0,
    path: "/",
    label: "HOME",
    element: (
      <>
        <div>home</div>
      </>
    ),
    withAuth: false
  },
  {
    id: 1,
    path: "/login",
    label: "Login 페이지",
    element: <LoginPage />,
    withAuth: false
  },
  {
    id: 2,
    path: "/login/redirect",
    label: "리다이렉트 페이지",
    element: <RedirectPage />,
    withAuth: true
  },
  {
    id: 3,
    path: "/foodForm",
    label: "음식 입력 페이지",
    element: <FoodFormPage />,
    withAuth: true
  },
  {
    id: 4,
    path: "/foodForm/info/:foodId",
    label: "음식 입력 결과 페이지",
    element: <FoodFormPage />,
    withAuth: true
  },
  {
    id: 5,
    path: "/mylist",
    label: "사용자의 입력 내역 페이지",
    element: <MylistPage />,
    withAuth: true
  },
  {
    id: 6,
    path: "/userlist",
    label: "사용자 조회 페이지",
    element: <UserlistPage />,
    withAuth: true,
    isAdminPage: true
  }
];

const TestFooter = () => {
  return (
    <div className="link-for-test">
      <li>
        <Link to="/login">로그인페이지로</Link>
      </li>
      <li>
        <Link to="/foodForm">입력페이지로</Link>
      </li>
      <li>
        <Link to="/mylist">입력목록 페이지로</Link>
      </li>
      <li>
        <Link to="/userlist">(어드민) 유저목록 페이지로</Link>
      </li>
      <li>
        <Link to="/login/redirect"> 리다이렉트 페이지로</Link>
      </li>
    </div>
  );
};
const routers = createBrowserRouter(
  routerData.map(router => {
    // if (router.withAuth) {
    //   return {
    //     path: router.path,
    //     element: (
    //       <AuthLayout
    //         isAdminPage={router.isAdminPage ? router.isAdminPage : null}
    //       >
    //         {router.element}
    //       </AuthLayout>
    //     )
    //   };
    // }
    return {
      path: router.path,
      element: (
        <>
          {router.element}
          <TestFooter />
        </>
      )
    };
  })
);

export default routers;
