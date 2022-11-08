import {useState} from "react";

const Auth = () => {
  const [isUser, setIsUser] = useState(false);
  const [userId, setUserId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) => {
    const {
      target: {name, value},
    } = e;

    // 값 가져오는 키
    if (name === "userId") {
      setIsUser(true);
      setUserId(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isUser) {
      // Login Success, route
    } else {
      // home 화면 돌아가기
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>{/* google, kakao login 서비스 */}</form>
    </div>
  );
};

export default Auth;
