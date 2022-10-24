import React from "react";
// import {useState} from "react";

import "../styles/main.css";
import Footer from "../components/footer";

const Header = (props) => {
  return (
    <header className="header">
      <div className="header_inner">{props.children}</div>
    </header>
  );
};

// 로그인 후 이동 안되는중!
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
