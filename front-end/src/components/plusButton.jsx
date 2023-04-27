import React from "react";
import styled, { css } from "styled-components";
import "../styles/main.css";
// import { MdAdd } from "react-icons/md";

const CircleButton = styled.button`
  background: var(--point-color);
  &:hover {
    background: #f6b607;
  }
  &:active {
    background: #e2a805;
  }
  z-index: 5;
  cursor: pointer;
  width: 55.5px !important;
  height: 55.5px !important;
  display: inline-block;
  text-align: center;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 80%;
  bottom: 20%;

  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;

  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #ff6b6b;
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}

  div {
    font-size: 1.8em;
    padding: 0;
    /* margin: 0.22em 0 0 0; */
  }
`;

/*
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
*/
const RouteButton = ({ goToPage }) => {
  return (
    <>
      <CircleButton onClick={() => (window.location.href = goToPage)}>
        <div>+</div>
      </CircleButton>
    </>
  );
};

export default RouteButton;
