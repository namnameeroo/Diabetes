import React from "react";

import { createBrowserRouter } from "react-router-dom";

import LoginPage from "pages/LoginPage";
/*eslint-disable */
import FoodFormPage from "pages/FoodFormPage";
import MylistPage from "pages/MylistPage";
import RedirectPage from "pages/RedirectPage";
import UserlistPage from "pages/UserlistPage";
import AuthLayout from "layout/AuthLayout";
import LogoutButton from "components/logoutButton";

/*eslint-disable */
// import FoodFormTest from "pages/FoodFormTest";
const routerData = [
  {
    id: 0,
    path: "/",
    label: "HOME",
    element: <LoginPage />,
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
    element: <FoodFormPage />, // 여기도
    // element: <FoodFormTest />, // 여기도
    withAuth: false // !!!! 여기 제거 해야 함
  },
  {
    id: 4,
    path: "/foodForm/info/:foodId",
    label: "음식 입력 결과 페이지",
    element: <FoodFormPage />,
    // element: <FoodFormTest />,
    withAuth: false // !!!! 여기 제거 해야 함
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

const routers = createBrowserRouter(
  routerData.map(router => {
    if (router.withAuth) {
      return {
        path: router.path,
        element: (
          <AuthLayout
            isAdminPage={router.isAdminPage ? router.isAdminPage : null}
          >
            {router.element}
            <LogoutButton />
          </AuthLayout>
        )
      };
    } else {
      return {
        path: router.path,
        element: router.element
      };
    }
  })
);

export default routers;
