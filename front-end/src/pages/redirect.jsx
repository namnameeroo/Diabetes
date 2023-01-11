import React from "react";
// import Auth from "components/auth";

import { useContext } from "react";
import { UserContext } from "components/userContext";

const RedirectPage = () => {
  const { user } = useContext(UserContext); // !important

  return (
    <>
      {/* <Auth /> */}
      <div style={{ height: "50px" }}>
        유저 이름 : {user ? user.info.email : null}
      </div>
      <div style={{ height: "50px" }}>유저 이름 : {"redirect"}</div>
    </>
  );
};
export default RedirectPage;
