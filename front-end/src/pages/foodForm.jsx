import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Utils from "utils";
import Footer from "components/footer";
import ResultToggle from "components/toggle";
import { getGl } from "components/gl";

import "styles/main.css";

const PageTitle = props => {
  return (
    <h3 className="page_title">
      <div className="page_title_inner">{props.children}</div>
    </h3>
  );
};

const PopUpSuccess = msg => {
  // 모달로 바꿔야 함
  alert(msg);
};

const postData = async inputs => {
  // console.log("post data", inputs);
  try {
    await axios
      .post(Utils.baseUrl + `/api/v1/foods`, inputs, { withCredentials: true })
      .then(res => {
        console.log(res);
        if (res.status === 201) {
          PopUpSuccess("결과가 저장되었습니다.");
        }
      });
  } catch (e) {
    console.error(e);
  }
};

const Today = () => {
  let now = new Date();
  let todayYear = now.getFullYear();
  let todayMonth = now.getMonth() + 1;
  let todayDay = now.getDate();

  return (
    <div className="right-align small-txt gray-txt">
      작성일 : {[todayYear, todayMonth, todayDay].join("-")}
    </div>
  );
};

const InputCell = ({ label, onChangeInput, value, placeHolder }) => {
  return (
    <div className="input_item" id="input_item_id">
      <input
        className="input_text"
        name={label}
        onChange={onChangeInput}
        value={value}
        placeholder={placeHolder}
      ></input>
    </div>
  );
};
const getNumOnly = input => {
  let nums = input.replaceAll(/[^0-9.]*/g, "");
  if (nums.at(-1) === ".") {
    return parseInt(nums).toString() + ".";
  } else {
    nums = parseFloat(nums);
  }
  return nums;
};

/**
 * EVENT
 */
const SubmitButton = props => {
  return (
    <div className="btn_wrap">
      <button
        type="submit"
        className="btn_submit"
        id={props.id}
        onClick={props.handleSubmitClick}
      >
        <span className="btn_text">{props.children}</span>
      </button>
    </div>
  );
};

const onSubmit = e => {
  e.preventDefault(); // 폼전송시 리액트 상태 초기화를 막음
};

const InputForm = () => {
  const [inputs, setInputs] = React.useState({
    userId: 1,
    foodName: "",
    provider: "",
    entireWeight: "",
    calories: "",
    carbohydrate: "",
    protein: "",
    fat: "",
    fiber: "",
    intake: "",
    remains: "",
    gl: "",
    result: ""
  });

  // prettier-ignore
  /* eslint-disable-next-line*/
  const {userId, foodName, provider, entireWeight, calories, carbohydrate, protein, fat, fiber, intake, remains, gl, result} = inputs;

  const setMsg = msg => {
    console.log(msg);
  };

  const onChangeInput = e => {
    const { name, value } = e.target;
    console.log(e.target, "target");
    const nextInput = {
      ...inputs,
      [name]: value
    };
    setInputs(nextInput);
  };

  const [toggleOpen, setToggleOpen] = useState(false);
  // const [GL, setGL] = useState(0);
  const onToggle = () => {
    setToggleOpen(!toggleOpen);
    const [newgl, newResult] = getGl(inputs);

    const nextInput = {
      ...inputs,
      ["gl"]: newgl,
      ["result"]: newResult
    };

    console.log(newgl, newResult);
    setInputs(nextInput);
    console.log(inputs);
  };

  const onChangeInputForNum = e => {
    const { name, value } = e.target;
    console.log(e.target, "target", value);
    if (isNaN(value)) {
      setMsg("숫자만 입력해주세요.");
    }
    const nextInput = {
      ...inputs,
      [name]: getNumOnly(value)
    };
    setInputs(nextInput);
    setToggleOpen(false);
    // 값이 변경되면 GL 결과를 다시 닫음
  };

  const handleSubmitClick = async () => {
    console.log("submit button clicked");
    inputs.name = inputs.foodName; // 키 달랐던 거 추가,
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
                  <InputCell
                    label="foodName"
                    onChangeInput={onChangeInput}
                    value={inputs.foodName ? inputs.foodName : ""}
                  />
                </td>
              </tr>
              <tr>
                <td className="pad-right-10">업체명</td>
                <td>
                  <InputCell
                    label="provider"
                    onChangeInput={onChangeInput}
                    value={inputs.provider ? inputs.provider : ""}
                  />
                </td>
              </tr>
              <tr>
                <td className="pad-right-10">
                  총량&nbsp; &nbsp; &nbsp; &nbsp;(g)
                </td>
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
                  {/* <InputCell label="intake" types="number" onChangeInput={onChangeInputForNum} value={inputs.intake ? inputs.intake : 0} /> */}
                  <InputCell
                    label="intake"
                    types="number"
                    onChangeInput={onChangeInputForNum}
                    placeHolder={0}
                    value={inputs.intake}
                  />
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
                <td className="pad-right-10">
                  지방&nbsp; &nbsp; &nbsp; &nbsp; (g)
                </td>
                <td>
                  <InputCell
                    label="fat"
                    types="number"
                    onChangeInput={onChangeInputForNum}
                    value={inputs.fat ? inputs.fat : 0}
                  />
                </td>
              </tr>
              <tr>
                <td className="pad-right-10">식이섬유 (g)</td>
                <td>
                  <InputCell
                    label="fiber"
                    types="number"
                    onChangeInput={onChangeInputForNum}
                    value={inputs.fiber ? inputs.fiber : 0}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>

      <ResultToggle
        onToggle={onToggle}
        open={toggleOpen}
        result={inputs.result + " " + inputs.gl}
      >
        결 과 보 기
      </ResultToggle>
      <SubmitButton handleSubmitClick={handleSubmitClick}>저 장</SubmitButton>

      {/*  모달... <button onClick={(e) => setVisibility(!visibility)}>Toggle Popup</button>
        <CustomPopup onClose={popupCloseHandler} show={visibility} title="Hello Jeetendra">
          <h1>Hello This is Popup Content Area</h1>
          <h2>This is my lorem ipsum text here!</h2>
        </CustomPopup> */}
    </>
  );
};

const MainForm = () => {
  return (
    <>
      <PageTitle>음식 정보 입력하기</PageTitle>
      <div id="main_form_container" className="container">
        <div id="main_form_inner" className="container_inner table_container">
          <Today />
          <InputForm />
        </div>
      </div>
    </>
  );
};

const InfoForm = ({ foodId }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(Utils.baseUrl + `/api/v1/foods/` + foodId, {
            withCredentials: true
          })
          .then(res => {
            console.log(foodId, "getFoodInfo");
            console.log(res);
          });
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <PageTitle>foodName 입력 정보</PageTitle>
      <div id="info_container" className="container">
        <div id="info_inner" className="container_inner table_container">
          <Today />
          <InputForm />
        </div>
      </div>
    </>
  );
};

const FoodFormPage = () => {
  const { foodId } = useParams();

  /*
    const [visibility, setVisibility] = useState(false);
    const popupCloseHandler = (e) => {
      setVisibility(e);
    };
  */

  return (
    <div id="wrap" className="wrap">
      {!foodId ? <MainForm /> : <InfoForm foodId={foodId} />}
      <Footer />

      {/* <CustomPopup onClose={popupCloseHandler} show={visibility} title="Hello Jeetendra"> */}
      {/* <h1>Hello This is Popup Content Area</h1>
        <h2>This is my lorem ipsum text here!</h2>
      </CustomPopup> */}
    </div>
  );
};

export default FoodFormPage;
