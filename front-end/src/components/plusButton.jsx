import React from "react";
import styled, {css} from "styled-components";
import "../styles/main.css";
import {MdAdd} from "react-icons/md";

const CircleButton = styled.button`
  background: var(--point-color);
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }
  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: sticky;
  left: 73%;
  bottom: 25px;

  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */

  transition: 0.125s all ease-in;
  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b;
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

const RouteButton = ({goToPage}) => {
  return (
    <>
      <CircleButton onClick={() => (window.location.href = goToPage)}>
        <MdAdd />
      </CircleButton>
    </>
  );
};

export default RouteButton;
