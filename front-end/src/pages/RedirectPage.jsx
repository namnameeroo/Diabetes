import React from "react";
// import { Navigate } from "react-router-dom";

const RedirectPage = () => {
  return (
    <>
      {/* <Navigate to="/mylist" /> */}
      <>
        <div style={{ height: "50px" }}>Redirect</div>
        <div style={{ height: "500px" }}>
          <a href="/login">
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
          </a>
          <a href="/">
            관리 계정 신청
            <br />
          </a>
        </div>
      </>
    </>
  );
};
export default RedirectPage;
