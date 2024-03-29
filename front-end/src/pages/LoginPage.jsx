import React from "react";

import "styles/main.css";
import Utils from "utils";
import Footer from "components/footer";

import { getCurrentUser } from "api/login";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "hooks/useRouter";

const Header = props => {
  return (
    <header className="header">
      <div className="header_inner">{props.children}</div>
    </header>
  );
};

const SocialButton = props => {
  // const [RequestURL, setRequestURL] = useState("");
  let requestUrl = "";
  const authUrl = Utils.BASE_URL + "/oauth2/authorization";

  if (props.name === "google") {
    requestUrl = authUrl + "/google";
  } else if (props.name === "kakao") {
    requestUrl = authUrl + "/kakao";
  }

  return (
    <button
      type="submit"
      className="btn_login"
      id={props.id}
      name={props.name}
      onClick={() => props.loginButtonHandler(requestUrl)}
    >
      <span className="btn_text">{props.children}</span>
    </button>
  );
};

const LoginContainer = ({ loginButtonHandler }) => {
  return (
    <div id="login-container" className="container">
      <div id="login_inner" className="container_inner">
        <div className="login_wrap">
          <div id="social_login_wrap">
            <SocialButton
              id="login-google"
              name="google"
              loginButtonHandler={loginButtonHandler}
            >
              구글로 로그인
            </SocialButton>
            <SocialButton
              id="login-kakao"
              name="kakao"
              loginButtonHandler={loginButtonHandler}
            >
              카카오 로그인
            </SocialButton>
          </div>
        </div>
      </div>
    </div>
  );
};

function LoginPage() {
  // 유저 정보 api 요청, null check
  const isLoggedIn = async () => {
    const userProfileResponse = await getCurrentUser();
    return userProfileResponse !== null;
  };

  const { routeTo } = useRouter();
  // const navigate = useNavigate();
  const loginButtonHandler = async requestUrl => {
    const isUserLoggedIn = await isLoggedIn();

    if (isUserLoggedIn) {
      console.log("이미 로그인된 유저");
      routeTo("/login/redirect");
      return;
    } else if (requestUrl) {
      window.location.href = requestUrl;
      return;
    }
  };

  return (
    <div id="wrap" className="wrap">
      <Header>혈당당</Header>
      <LoginContainer loginButtonHandler={loginButtonHandler} />
      <Footer />
    </div>
  );
}

export default LoginPage;
