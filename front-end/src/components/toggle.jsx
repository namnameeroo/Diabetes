import React from "react";
import styled, { css } from "styled-components";

const ToggleButton = styled.button`
  &:hover {
    /* background: #63e6be; */
  }
  &:active {
    /* background: #20c997; */
    /* display: none; */
  }

  z-index: 5;
  cursor: pointer;
  width: 100%;
  /* height: 80px; */
  /* display: block; */
  align-items: center;
  justify-content: center;
  position: relative; /**absolute */
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  outline: none;
  display: flex;

  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%);
    `}
`;

const InsertViewPostioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: relative;
`;
const InsertView = styled.div`
  /* background: #f8f9fa; */
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

function ResultToggle(props) {
  return (
    <>
      {props.open && (
        <InsertViewPostioner>
          <InsertView>
            <div className="gl-result-content">{props.result}</div>
          </InsertView>
        </InsertViewPostioner>
      )}
      <div className="btn_wrap" id="btn_result_wrap">
        <ToggleButton
          className="btn_result btn_text"
          id="btn_result"
          onClick={props.onToggle}
          open={props.open}
        >
          {props.children}
        </ToggleButton>
      </div>
    </>
  );
}

export default ResultToggle;
