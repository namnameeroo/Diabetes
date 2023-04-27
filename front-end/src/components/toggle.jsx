import React from "react";
import styled from "styled-components";

const InsertViewPostioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: relative;
  /* padding-top: 15px; */
`;

// 결과 토글 창
const InsertView = styled.div`
  background: white;
  padding-left: 20px;
  padding-top: 12px;
  padding-right: 20px;
  padding-bottom: 25px;
  border-radius: 12px;
  /* border-bottom-left-radius: 16px; */
  /* border-bottom-right-radius: 16px; */
  border-radius: 15px;
  border: 1px solid #e9ecef;
  margin-bottom: 15px;
`;

function ToggleView(props) {
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
    </>
  );
}

export default ToggleView;
