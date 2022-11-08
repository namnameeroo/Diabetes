import React from "react";
import {useEffect, useState} from "react";
import Utils from "../utils";

import "../styles/main.css";
import Footer from "../components/footer";

const Header = (props) => {
  return (
    <header className="header">
      <div className="header_inner">{props.children}</div>
    </header>
  );
};

const SocialButton = (props) => {
  const [RequestURL, setRequestURL] = useState("");
  const onSocialClick = async (event) => {
    const {
      target: {name},
    } = event;

    if (name === "google") {
      // 구글 로그인 요청
      setRequestURL(Utils.baseUrl + "/oauth2/authorization/google?redirect");
      //
    } else if (name === "kakao") {
      // 카카오 로그인 요청
      setRequestURL(Utils.baseUrl + "/oauth2/authorization/kakao?redirect");
    }
  };

  return (
    <button type="submit" className="btn_login" id={props.id} name={props.name} onClick={onSocialClick}>
      <span className="btn_text">{props.children}</span>
    </button>
  );
};

const LoginContainer = () => {
  return (
    <div id="container" className="container">
      <div id="container_inner" className="container_inner">
        <div className="login_wrap">
          {/* <form> */}
          <div id="social_login_wrap">
            <SocialButton id="login.google" name="google">
              구글로 로그인
            </SocialButton>
            <SocialButton id="login.kakao" name="kakao">
              카카오로 로그인
            </SocialButton>
          </div>
          {/* </form> */}
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

export default LoginPage;
