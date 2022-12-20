import React from "react";

import "styles/main.css";
import Utils from "utils";
import Footer from "components/footer";

const Header = props => {
  return (
    <header className="header">
      <div className="header_inner">{props.children}</div>
    </header>
  );
};

const SocialButton = props => {
  // const [RequestURL, setRequestURL] = useState("");
  let RequestUrl = "";
  const authUrl = Utils.baseUrl + "/oauth2/authorization";

  if (props.name === "google") {
    RequestUrl = authUrl + "/google";
  } else if (props.name === "kakao") {
    RequestUrl = authUrl + "/kakao";
  }

  return (
    <button
      type="submit"
      className="btn_login"
      id={props.id}
      name={props.name}
      onClick={() => {
        window.location.href = RequestUrl;
      }}
    >
      <span className="btn_text">{props.children}</span>
    </button>
  );
};

const LoginContainer = () => {
  return (
    <div id="login-container" className="container">
      <div id="login_inner" className="container_inner">
        <div className="login_wrap">
          <div id="social_login_wrap">
            <SocialButton id="login-google" name="google">
              구글로 로그인
            </SocialButton>
            <SocialButton id="login-kakao" name="kakao">
              카카오 로그인
            </SocialButton>
          </div>
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
