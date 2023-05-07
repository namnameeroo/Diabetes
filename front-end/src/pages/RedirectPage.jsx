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
      <div id="wrap" className="btn_list_wrap">
        <div className="container_inner">
          <div
            id="home-button-list"
            style={{ paddingTop: "150px", minHeight: "400px" }}
          >
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
    </>
  );
};
export default RedirectPage;
