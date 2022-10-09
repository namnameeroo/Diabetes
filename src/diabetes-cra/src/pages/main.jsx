import React from "react";
import "../styles/main.css";
import Footer from "../components/footer";

const PageTitle = (props) => {
  return (
    <h3 className="page_title">
      <div className="page_title_inner">{props.children}</div>
    </h3>
  );
};

const InputCell = (props) => {
  return (
    <div className="input_item" id="input_item_id">
      <input type="text" id={props.id} placeholder={props.placeholder} class="input_text"></input>
    </div>
  );
};

// prettier-ignore
const MainContainer = () => {
  return (
    <div id="container" className="container">
      <div id="container_inner" className="container_inner table_container">
        <div className="main_wrap table_wrap">
          <table className="simple_font">
            <tr>
              <td>제품명</td>
              <td><InputCell /></td>
            </tr>
            <tr>
              <td>업체명</td>
              <td><InputCell /></td>
            </tr>
            <tr>
              <td>총량</td>
              <td><InputCell /></td>
            </tr>
            {/* 
            단위들 스팬에 넣고... 공백 맞추기!
            */}
            <tr>
              <td>섭취량<span>(%)</span></td>
              <td><InputCell /></td>
            </tr>
            <tr>
              <td>칼로리&nbsp; &nbsp; &nbsp;(g)</td><td><InputCell /></td>
            </tr>
            <tr>
              <td>탄수화물 (g)</td><td><InputCell /></td>
            </tr>
            <tr>
              <td>단백질&nbsp; &nbsp; &nbsp;(g)</td><td><InputCell /></td>
            </tr>
            <tr>
              <td>지방&nbsp; &nbsp; &nbsp; &nbsp; (g)</td><td><InputCell /></td>
            </tr>
            <tr>
              <td>식이섬유 (g)</td><td><InputCell /></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

function MainPage() {
  return (
    <div id="wrap" className="wrap">
      <PageTitle>음식 입력하기</PageTitle>
      <MainContainer />
      <Footer />
    </div>
  );
}

export default MainPage;
