import React from "react";
import { RouterProvider } from "react-router-dom";
import routers from "router";
import "styles/main.css";

import { useContext } from "react";
import { CurrentUserProvider, UserContext } from "components/userContext";
// export const LogginContext = createContext();

function App() {
  /* eslint-disable*/
  // const User = useContext(UserContext);
  // const [UserInfo, setUserInfo] = useState(initialUser.info);

  const user = useContext(UserContext);
  console.log("🚀 ~ file: App.js:17 ~ App ~ User", JSON.stringify(user));

  return (
    <div>
      <CurrentUserProvider value={user}>
        <div id="main-card">
          <RouterProvider router={routers} />
        </div>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
