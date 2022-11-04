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
  // const [errorMsg, setErrorMsg] = React.useState("에러 발생");

  console.log(e.target, "값");
  console.log(e.target[0]);
  console.log(e);

  console.log("form 전송");
  // setCounter(counter + 1);
  e.preventDefault();
};

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

const Today = () => {
  let now = new Date();
  let todayYear = now.getFullYear();
  let todayMonth = now.getMonth();
  let todayDay = now.getDate();

  return <div className="right-align small-txt gray-txt">작성일 : {[todayYear, todayMonth, todayDay].join("-")}</div>;
};
const InputForm = () => {
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="main_wrap table_wrap">
        <table className="simple_font">
          <tbody>
            <tr>
              <td className="pad-right-10">제품명</td>
              <td>
                <InputCell />
              </td>
            </tr>
            <tr>
              <td className="pad-right-10">업체명</td>
              <td>
                <InputCell />
              </td>
            </tr>
            <tr>
              <td className="pad-right-10">총량&nbsp; &nbsp; &nbsp; &nbsp;(g)</td>
              <td>
                <InputCell />
              </td>
            </tr>
            {/* 단위들 스팬에 넣고... 공백 맞추기!*/}
            <tr>
              <td className="pad-right-10">섭취량&nbsp; &nbsp; &nbsp;(%)</td>
              <td>
                <InputCell />
              </td>
            </tr>
            <tr>
              <td className="pad-right-10">칼로리&nbsp; &nbsp; &nbsp;(g)</td>
              <td>
                <InputCell />
              </td>
            </tr>
            <tr>
              <td className="pad-right-10">탄수화물 (g)</td>
              <td>
                <InputCell />
              </td>
            </tr>
            <tr>
              <td className="pad-right-10">단백질&nbsp; &nbsp; &nbsp;(g)</td>
              <td>
                <InputCell />
              </td>
            </tr>
            <tr>
              <td className="pad-right-10">지방&nbsp; &nbsp; &nbsp; &nbsp; (g)</td>
              <td>
                <InputCell />
              </td>
            </tr>
            <tr>
              <td className="pad-right-10">식이섬유 (g)</td>
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
  );
};

// prettier-ignore
const MainContainer = () => {
  return (
    <div id="container" className="container">
      <div id="container_inner" className="container_inner table_container">
        <Today />
        <InputForm />
      </div>
    </div>
  );
};

function FoodFormPage() {
  return (
    <div id="wrap" className="wrap">
      <PageTitle>음식 입력하기</PageTitle>
      <MainContainer />
      <Footer />
    </div>
  );
}

export default FoodFormPage;
