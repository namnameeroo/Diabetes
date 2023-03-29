import React from "react";
import { RouterProvider } from "react-router-dom";
import routers from "router";
import "styles/main.css";

function App() {
  return (
    <div>
      <div id="main-card">
        <RouterProvider router={routers} />
      </div>
    </div>
  );
}

export default App;
