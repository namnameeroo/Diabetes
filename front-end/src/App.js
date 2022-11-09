import React from "react";
import AppRouter from "components/router";

import {Link} from "react-router-dom";

function App() {
  let container = {
    // backgroudColor: "white",
    // width: "40%",
    // margin: "0 auto",
  };

  return (
    <div style={container}>
      <AppRouter />

      <div className="temp">
        <li>
          <Link to="/login">로그인페이지로</Link>
        </li>
        <li>
          <Link to="/foodForm">입력페이지로</Link>
        </li>
        <li>
          <Link to="/mylist">입력목록 페이지로</Link>
        </li>
        <li>
          <Link to="/adminUserList">(어드민) 유저목록 페이지로</Link>
        </li>
      </div>
    </div>
  );
}

export default App;
