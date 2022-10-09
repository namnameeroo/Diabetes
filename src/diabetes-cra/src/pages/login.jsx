import React from "react";
import {useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "../styles/main.css";
import MainPage from "./main";

const Header = (props) => {
  return (
    <header className="header">
      <div className="header_inner">{props.children}</div>
    </header>
  );
};

// // 로그인 후 이동 안되는중!
// const AuthSubmit = () => {
//   const [User, Valid] = useState("");
//   console.log("goto main");
//   return (
//     // <BrowserRouter>
//     <Routes>
//       <Route path="/main" element={MainPage} />
//     </Routes>
//     // </BrowserRouter>
//   );
// };

const LoginButton = (props) => {
  return (
    <button type="submit" className="btn_login" id={props.id}>
      <span className="btn_text">{props.children}</span>
    </button>
  );
};

const LoginContainer = () => {
  return (
    <div id="container" className="container">
      <div id="container_inner" className="container_inner">
        <div className="login_wrap">
          <form>
            <div id="social_login_wrap">
              <LoginButton id="login.google">구글로 로그인</LoginButton>
              <LoginButton id="login.kakao">카카오로 로그인</LoginButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_inner">
        <ul className="footer_info">
          <li>
            <span className="text">사업자 정보 Sajang | 이메일 jaong@ja.com</span>
          </li>
          <li>
            <span className="text">로그인 페이지 입니다롱</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

function LoginPage() {
  return (
    <div id="wrap" className="wrap">
      <Header>혈당당</Header>
      <LoginContainer />
      <Footer />
    </div>
  );
}
// let $wrap = document.querySelector("div.wrap");
// ReactDOM.render(app, $wrap);
export default LoginPage;
