import React from "react";
import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

const RedirectPage = () => {
  const menulist = [
    // {
    //   idx: '0',
    //   title:'로그인 화면으로',
    //   name:'login',
    //   path: '/login',
    // },
    {
      idx: "1",
      title: "eGL 입력하기",
      name: "foodForm",
      path: "/foodForm"
    },
    {
      idx: "2",
      title: "입력 내역",
      name: "mylist",
      path: "/mylist"
    },
    {
      idx: "3",
      title: "유저 현황",
      name: "userlist",
      path: "/userlist"
    }
    // {
    //   idx: '',
    //   title:'',
    //   name:'',
    //   path: '/',
    // },
  ];
  const navigate = useNavigate();
  return (
    <>
      <div id="login-container" className="container">
        <div id="login_inner" className="container_inner">
          <div className="login_wrap">
            <div id="social_login_wrap">
              {menulist.map((menu, k) => {
                return (
                  <button
                    type="submit"
                    className="btn_menu"
                    id={menu.name}
                    key={k}
                    onClick={() => navigate(menu.path)}
                  >
                    <span className="btn_text">{menu.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* <div style={{ height: "500px" }}> */}
      {/* <a href="/login">
          login
          <br />
        </a>
        <a href="/foodForm">
          입력 폼
          <br />
        </a>
        <a href="/mylist">
          입력 현황
          <br />
        </a>
        <a href="/userlist">
          유저 현황
          <br />
        </a> */}
      {/* </div> */}
    </>
  );
};
export default RedirectPage;
