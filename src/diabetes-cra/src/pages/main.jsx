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
const MainContainer = () => {
  return (
    <div id="container" className="container">
      <div id="container_inner" className="container_inner table_container">
        <div className="main_wrap table_wrap">
          <table className="simple_font">
            <tr>
              <td>음식명</td>
              <td>
                <InputCell />
              </td>
            </tr>
            <tr>
              <td>칼로리</td>
              <td>
                <InputCell />
              </td>
            </tr>
            <tr>
              <td>섭취량</td>
              <td>
                <InputCell />
              </td>
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
