import React from "react";
import {Routes, Route} from "react-router-dom";
import LoginPage from "./pages/login";
import MainPage from "./pages/main";

function App() {
  let container = {
    backgroudColor: "white",
    width: "40%",
    margin: "0 auto",
  };

  return (
    <div style={container}>
      <div>hi</div>
      <Routes>
        <Route index element={<LoginPage />}></Route>
        {/* component => element (최신 문법) 근데 아직도 해결 안됨 */}
        <Route path="/main" element={<MainPage />}></Route>
      </Routes>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
    //       Learn React Nami!
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
