import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import Utils from "utils";
import Footer from "components/footer";
import "styles/main.css";

const PageTitle = (props) => {
  return (
    <h3 className="page_title">
      <div className="page_title_inner">{props.children}</div>
    </h3>
  );
};

const postData = async (inputs) => {
  console.log("post data", inputs);
  try {
    await axios
      .post(Utils.baseUrl + `/api/v1/foods`, {
        data: inputs,
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        console.log("form submit success");
      });

    // console.log(res.data.result.content);
  } catch (e) {
    console.error(e);
  }
};

const Today = () => {
  let now = new Date();
  let todayYear = now.getFullYear();
  let todayMonth = now.getMonth() + 1;
  let todayDay = now.getDate();

  return <div className="right-align small-txt gray-txt">작성일 : {[todayYear, todayMonth, todayDay].join("-")}</div>;
};

const InputCell = ({label, onChangeInput, value}) => {
  return (
    <div className="input_item" id="input_item_id">
      <input className="input_text" name={label} onChange={onChangeInput} value={value}></input>
    </div>
  );
};
const getNumOnly = (input) => {
  return input.replaceAll(/[^0-9]*/g, "");
};

const InputForm = () => {
  // const [inputList, setInputList] = React.useState([""] * 10);
  const [inputs, setInputs] = React.useState({
    userId: 4,
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
    result: "MIDDLE",
  });

  const {userId, foodName, provider, entireWeight, calories, carbohydrate, protein, fat, fiber, intake, remains, gl, result} = inputs;

  const setMsg = (msg) => {
    console.log(msg);
  };

  const onChangeInput = (e) => {
    const {name, value} = e.target;
    console.log(e.target, "target");
    const nextInput = {
      ...inputs,
      [name]: value,
    };

    setInputs(nextInput);
  };

  const onChangeInputForNum = (e) => {
    const {name, value} = e.target;
    console.log(e.target, "target", value);
    if (isNaN(value)) {
      setMsg("숫자만 입력해주세요.");
    }
    const nextInput = {
      ...inputs,
      [name]: getNumOnly(value),
    };
    setInputs(nextInput);
  };

  const onSubmit = (e) => {
    e.preventDefault(); // 폼전송시 리액트 상태 초기화를 막음
  };

  const handleSubmitClick = async () => {
    console.log("submit button clicked");
    inputs.name = inputs.foodName; // 키 다른 거 수정

    await postData(inputs).then(() => console.log("posted"));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="main_wrap table_wrap">
          <table className="simple_font">
            <tbody>
              <tr>
                <td className="pad-right-10">제품명</td>
                <td>
                  <InputCell label="foodName" onChangeInput={onChangeInput} value={inputs.foodName ? inputs.foodName : ""} />
                </td>
              </tr>
              <tr>
                <td className="pad-right-10">업체명</td>
                <td>
                  <InputCell label="provider" onChangeInput={onChangeInput} value={inputs.provider ? inputs.provider : ""} />
                </td>
              </tr>
              <tr>
                <td className="pad-right-10">총량&nbsp; &nbsp; &nbsp; &nbsp;(g)</td>
                <td>
                  <InputCell
                    label="entireWeight"
                    types="number"
                    onChangeInput={onChangeInputForNum}
                    value={inputs.entireWeight ? inputs.entireWeight : 0}
                  />
                </td>
              </tr>

              <tr>
                <td className="pad-right-10">섭취량&nbsp; &nbsp; &nbsp;(%)</td>
                <td>
                  <InputCell label="intake" types="number" onChangeInput={onChangeInputForNum} value={inputs.intake ? inputs.intake : 0} />
                </td>
              </tr>
              <tr>
                <td className="pad-right-10">칼로리&nbsp; &nbsp; &nbsp;(g)</td>
                <td>
                  <InputCell
                    label="calories"
                    types="number"
                    onChangeInput={onChangeInputForNum}
                    value={inputs.calories ? inputs.calories : 0}
                  />
                </td>
              </tr>
              <tr>
                <td className="pad-right-10">탄수화물 (g)</td>
                <td>
                  <InputCell
                    label="carbohydrate"
                    types="number"
                    onChangeInput={onChangeInputForNum}
                    value={inputs.carbohydrate ? inputs.carbohydrate : 0}
                  />
                </td>
              </tr>
              <tr>
                <td className="pad-right-10">단백질&nbsp; &nbsp; &nbsp;(g)</td>
                <td>
                  <InputCell
                    label="protein"
                    types="number"
                    onChangeInput={onChangeInputForNum}
                    value={inputs.protein ? inputs.protein : 0}
                  />
                </td>
              </tr>
              <tr>
                <td className="pad-right-10">지방&nbsp; &nbsp; &nbsp; &nbsp; (g)</td>
                <td>
                  <InputCell label="fat" types="number" onChangeInput={onChangeInputForNum} value={inputs.fat ? inputs.fat : 0} />
                </td>
              </tr>
              <tr>
                <td className="pad-right-10">식이섬유 (g)</td>
                <td>
                  <InputCell label="fiber" types="number" onChangeInput={onChangeInputForNum} value={inputs.fiber ? inputs.fiber : 0} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
      <SubmitButton id="submit_item" handleSubmitClick={handleSubmitClick}>
        저 장
      </SubmitButton>
    </>
  );
};

const SubmitButton = (props) => {
  return (
    <div className="submit_wrap">
      <div id="submit_button_wrap">
        <button types="submit" className="btn_submit" id={props.id} onClick={props.handleSubmitClick}>
          <span className="btn_text">{props.children}</span>
        </button>
      </div>
    </div>
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
