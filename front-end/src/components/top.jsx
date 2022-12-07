import React from "react";
import "styles/components.css";
import styled from "styled-components";
import { FiChevronLeft } from "react-icons/fi";
import { HiOutlineSearch } from "react-icons/hi";

const Header = styled.header`
  height: 45px;
  padding: 0.8em 10px;
  color: white;
  background: var(--point-color);
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  position: fixed;
  max-width: 600px;
  margin: 0 auto;
  
  top: 0;
  left: 0;
  right: 0;

  div {
    display: flex;
    align-items: center;
  }
  div * {
    padding-right: 15px;
  }
  svg {
    width: 25px !important;
    height: 25px !important;
  }
`;
const Top = (props) => {
  let Left = "";
  if (!props.leftbutton) {
    Left = <FiChevronLeft className="react-fcon" id="left-arrow" />;
  }
  return (
    <Header>
      <div>
        {Left}
        <h1>{props.title}</h1>
      </div>
      <span>
        <HiOutlineSearch />
      </span>
    </Header>
  );
};

export default Top;
