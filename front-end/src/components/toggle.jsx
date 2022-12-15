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
  padding-top: 20px;
`;

// 결과 토글 창
const InsertView = styled.div`
  background: white;
  padding-left: 25px;
  padding-top: 32px;
  padding-right: 25px;
  padding-bottom: 40px;

  /* border-bottom-left-radius: 16px; */
  /* border-bottom-right-radius: 16px; */
  border-radius: 15px;
  border: 1px solid #e9ecef;
`;

function ResultToggle(props) {
  return (
    <>
      {props.open && (
        <InsertViewPostioner>
          <InsertView>
            <div className="gl-result-content">{props.result}</div>
            <div className="gl-result-content">
              {props.gl.toString().slice(0, 8)}
            </div>
            <div className="gray-txt center-txt">
              {props.result == "LOW" && "혈당 상승에 영향이 적은 음식입니다."}
              {props.result == "HIGH" && "혈당 상승에 영향이 큰 음식입니다."}
              {props.result == "MIDDLE" &&
                "혈당 상승에 영향이 어느 정도 있는 음식입니다."}
            </div>
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
          <div>{props.children}</div>
        </ToggleButton>
      </div>
    </>
  );
}

export default ResultToggle;
