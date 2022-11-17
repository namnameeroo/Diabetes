import React from "react";
import "styles/main.css";
import Footer from "components/footer";
import {useState, useEffect} from "react";

const PageTitle = (props) => {
  return (
    <h3 className="page_title">
      <div className="page_title_inner">{props.children}</div>
    </h3>
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

const Today = () => {
  let now = new Date();
  let todayYear = now.getFullYear();
  let todayMonth = now.getMonth() + 1;
  let todayDay = now.getDate();

  return <div className="right-align small-txt gray-txt">작성일 : {[todayYear, todayMonth, todayDay].join("-")}</div>;
};

const InputCell = ({label, types}) => {
  const [inputs, setInputs] = React.useState({
    id: "",
    foodName: "",
    provider: "",
    entireWeight: 0,
    calories: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    fiber: 0,
    intake: 0,
    remains: 0,
    gl: 0,
    result: "",
  });

  const {id, foodName, provider, entireWeight, calories, carbohydrate, protein, fat, fiber, intake, remains, gl, result} = inputs;

  const setMsg = (msg) => {
    console.log(msg);
  };

  const onChangeInput = (e) => {
    const {name, value} = e.target;
    console.log(e.target, "target");
    if (types === "Number" && isNaN(value)) {
      setMsg("숫자만 입력해주세요.");
    }

    const nextInput = {
      ...inputs,
      [name]: value,
    };
    setInputs(nextInput);
  };

  return (
    <div className="input_item" id="input_item_id">
      <input type="text" className="input_text" name={label} value={inputs[label]} onChange={onChangeInput}></input>
    </div>
  );
};

const InputForm = () => {
  // const [inputList, setInputList] = React.useState([""] * 10);

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

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="main_wrap table_wrap">
        <table className="simple_font">
          <tbody>
            <tr>
              <td className="pad-right-10">제품명</td>
              <td>
                <InputCell label="foodName" />
              </td>
            </tr>
            <tr>
              <td className="pad-right-10">업체명</td>
              <td>
                <InputCell label="provider" />
              </td>
            </tr>
            <tr>
              <td className="pad-right-10">총량&nbsp; &nbsp; &nbsp; &nbsp;(g)</td>
              <td>
                <InputCell label="entireWeight" types="Number" />
              </td>
            </tr>

            <tr>
              <td className="pad-right-10">섭취량&nbsp; &nbsp; &nbsp;(%)</td>
              <td>
                <InputCell label="intake" types="Number" />
              </td>
            </tr>
            <tr>
              <td className="pad-right-10">칼로리&nbsp; &nbsp; &nbsp;(g)</td>
              <td>
                <InputCell label="calories" types="Number" />
              </td>
            </tr>
            <tr>
              <td className="pad-right-10">탄수화물 (g)</td>
              <td>
                <InputCell label="carbohydrate" types="Number" />
              </td>
            </tr>
            <tr>
              <td className="pad-right-10">단백질&nbsp; &nbsp; &nbsp;(g)</td>
              <td>
                <InputCell label="protein" types="Number" />
              </td>
            </tr>
            <tr>
              <td className="pad-right-10">지방&nbsp; &nbsp; &nbsp; &nbsp; (g)</td>
              <td>
                <InputCell label="fat" types="Number" />
              </td>
            </tr>
            <tr>
              <td className="pad-right-10">식이섬유 (g)</td>
              <td>
                <InputCell label="fiber" types="Number" />
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
