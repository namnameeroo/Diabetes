import React from "react";
import { RouterProvider } from "react-router-dom";
import routers from "router";
import "styles/main.css";

function App() {
  return (
    <div>
      <main id="main-card">
        <RouterProvider router={routers} />
      </main>
    </div>
  );
}

export default App;
