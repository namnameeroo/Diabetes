import React from "react";
import {Routes, Route} from "react-router-dom";
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
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
