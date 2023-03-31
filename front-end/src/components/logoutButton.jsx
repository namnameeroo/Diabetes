import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LogoutStyle = styled.div`
  div {
    text-align: center;
  }

  button {
    border: none;
    background: none;
    color: #c3bfbf;
    font-size: 0.8em;
    text-transform: capitalize;
    text-decoration: underline;
    position: relative;
    padding: 10px;
  }
`;
const deleteCookie = () => {
  document.cookie = "JSESSIONID" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
  console.log("로그아웃 - ");
};

const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = async () => {
    deleteCookie();
    return navigate("/login");
  };

  const logoutButtonHandler = async () => {
    return logout();
  };
  return (
    <LogoutStyle>
      <div>
        <button onClick={logoutButtonHandler}>logout</button>
      </div>
    </LogoutStyle>
  );
};

export default LogoutButton;
