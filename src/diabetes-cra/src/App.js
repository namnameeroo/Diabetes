import React from "react";
import {Routes, Route, Link} from "react-router-dom";
// import styled from "styled-component";
import LoginPage from "./pages/login";
import MainPage from "./pages/main";

function App() {
  let container = {
    // backgroudColor: "white",
    // width: "40%",
    // margin: "0 auto",
  };

  return (
    <div style={container}>
      <div className="temp">
        <li>
          <Link to="/login">로그인페이지로</Link>
        </li>
        <li>
          <Link to="/main">메인페이지로</Link>
        </li>
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
