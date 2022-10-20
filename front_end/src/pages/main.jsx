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
  // const [value, setValue] = React.useState("");

  return (
    <div className="input_item" id="input_item_id">
      <input type="text" id={props.id} placeholder={props.placeholder} className="input_text"></input>
    </div>
  );
};

const handleFormSubmit = (e) => {
  console.log(e.target, "값");
  console.log(e.target[0]);
  console.log(e);
  console.log("form 전송");
  // setCounter(counter + 1);
  e.preventDefault();
};

// const getInputValue = () => {};
// const [errorMessage, setErrorMessage] = React.useState("빈 값이 있습니다.");

const SubmitButton = (props) => {
  const handleSubmitClick = () => {
    console.log("submit button clicked");
  };
  return (
    <button type="submit" className="btn_submit" id={props.id} onClick={handleSubmitClick}>
      <span className="btn_text">{props.children}</span>
    </button>
  );
};
// prettier-ignore

const MainContainer = () => {
  return (
    <div id="container" className="container">
      <div id="container_inner" className="container_inner table_container">
        <form onSubmit={handleFormSubmit}>
          <div className="main_wrap table_wrap">
            <table className="simple_font">
              <tbody>
                <tr>
                  <td>제품명</td>
                  <td>
                    <InputCell />
                  </td>
                </tr>
                <tr>
                  <td>업체명</td>
                  <td>
                    <InputCell />
                  </td>
                </tr>
                <tr>
                  <td>총량</td>
                  <td>
                    <InputCell />
                  </td>
                </tr>
                {/* 단위들 스팬에 넣고... 공백 맞추기!*/}
                <tr>
                  <td>
                    섭취량<span>(%)</span>
                  </td>
                  <td>
                    <InputCell />
                  </td>
                </tr>
                <tr>
                  <td>칼로리&nbsp; &nbsp; &nbsp;(g)</td>
                  <td>
                    <InputCell />
                  </td>
                </tr>
                <tr>
                  <td>탄수화물 (g)</td>
                  <td>
                    <InputCell />
                  </td>
                </tr>
                <tr>
                  <td>단백질&nbsp; &nbsp; &nbsp;(g)</td>
                  <td>
                    <InputCell />
                  </td>
                </tr>
                <tr>
                  <td>지방&nbsp; &nbsp; &nbsp; &nbsp; (g)</td>
                  <td>
                    <InputCell />
                  </td>
                </tr>
                <tr>
                  <td>식이섬유 (g)</td>
                  <td>
                    <InputCell />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="submit_wrap">
            <div id="submit_button_wrap">
              <SubmitButton id="submit_item">저 장</SubmitButton>
            </div>
          </div>
        </form>
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