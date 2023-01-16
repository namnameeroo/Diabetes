import React from "react";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

import axios from "axios";
import Utils from "utils";

import Top from "components/top";
import Footer from "components/footer";
import ResultToggle from "components/toggle";
import { getGl } from "components/gl";

import { UserContext } from "components/userContext";

import { useNavigate } from "react-router-dom";

import "styles/main.css";
import { useContext } from "react";

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
  if (!nums) {
    nums = 0;
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

/* eslint-disable-next-line*/
const InputForm = ({ dataset }) => {
  const [inputs, setInputs] = React.useState({
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

  // 기존 입력값 있을 때,
  useEffect(() => {
    console.log("기존 입력값");
    if (dataset) {
      console.log("🚀 ~ file: foodForm.jsx:124 ~ useEffect ~ dataset", dataset);
      setInputs({ ...dataset });
    }
  }, []);

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

  const formValidation = () => {
    if (inputs.entireWeight === 0 || inputs.intake === 0) {
      confirm("총량과 섭취량은 0일 수 없습니다.");
      return false;
    } else if (inputs.entireWeight === "" || inputs.intake === "") {
      confirm("총량과 섭취량을 입력해주세요.");
      return false;
    } else {
      return true;
    }
  };

  const [toggleOpen, setToggleOpen] = useState(false);
  const onToggle = () => {
    if (!formValidation()) {
      return;
    }

    setToggleOpen(!toggleOpen);
    const [newgl, newResult] = getGl(inputs);
    const nextInput = {
      ...inputs,
      ["gl"]: newgl,
      ["result"]: newResult
    };
    console.log(
      "🚀 ~ file: foodForm.jsx:148 ~ onToggle ~ newgl",
      newgl,
      newResult
    );

    setInputs(nextInput);
    console.log(inputs);
  };

  const onChangeInputForNum = e => {
    const { name, value } = e.target;
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
  const navigate = useNavigate();
  const handleSubmitClick = async () => {
    console.log("submit button clicked");
    inputs.name = inputs.foodName; // 키 달랐던 거 추가,

    if (inputs.gl === "" || !toggleOpen) {
      onToggle();
      await postData(inputs).then(
        () => confirm("저장했습니다. 목록페이지로 이동합니다.") && navigate(-1)
        // 이전 페이지로 이동
      );
    } else if (formValidation()) {
      await postData(inputs).then(
        () => confirm("저장했습니다. 목록페이지로 이동합니다.") && navigate(-1)
        // 이전 페이지로 이동
      );
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="main_wrap table_wrap">
          <table className="simple_font form-table">
            <tbody>
              <tr>
                <td className="pad-right-10">제품명</td>
                <td>
                  <InputCell
                    label="foodName"
                    onChangeInput={onChangeInput}
                    placeHolder={"제품명을 적어주세요"}
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
                    placeHolder={0}
                    value={inputs.entireWeight}
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
                    placeHolder={0}
                    value={inputs.calories}
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
                    placeHolder={0}
                    value={inputs.carbohydrate}
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
                    placeHolder={0}
                    value={inputs.protein}
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
                    placeHolder={0}
                    value={inputs.fat}
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
                    placeHolder={0}
                    value={inputs.fiber}
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
        result={inputs.result}
        gl={inputs.gl}
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

const NewForm = ({ dataset }) => {
  return (
    <>
      <PageTitle>음식 정보 입력하기</PageTitle>
      <div id="main_form_container" className="container">
        <div id="main_form_inner" className="container_inner table_container">
          <Today />
          <InputForm dataset={dataset} />
        </div>
      </div>
    </>
  );
};

const InfoForm = ({ dataset, handleEditable }) => {
  const InfoCell = ({ label, value }) => {
    return (
      // <div className="input_item" id="input_item_id">
      <div className="info_text" name={label} value={value}></div>
      // </div>
    );
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="main_wrap table_wrap">
          <table className="simple_font form-table">
            <tbody>
              <tr>
                <td className="pad-right-10 tr-title">제품명</td>
                <td>
                  <InfoCell
                    label="foodName"
                    value={dataset.foodName ? dataset.foodName : ""}
                  />
                </td>
              </tr>
              <tr>
                <td className="pad-right-10">업체명</td>
                <td>
                  <InfoCell
                    label="provider"
                    value={dataset.provider ? dataset.provider : ""}
                  />
                </td>
              </tr>
              <tr>
                <td className="pad-right-10">
                  총량&nbsp; &nbsp; &nbsp; &nbsp;(g)
                </td>
                <td>
                  <InfoCell
                    label="entireWeight"
                    types="number"
                    value={dataset.entireWeight}
                  />
                </td>
              </tr>

              <tr>
                <td className="pad-right-10">섭취량&nbsp; &nbsp; &nbsp;(%)</td>
                <td>
                  <InfoCell
                    label="intake"
                    types="number"
                    value={dataset.intake}
                  />
                </td>
              </tr>
              <tr>
                <td className="pad-right-10">칼로리&nbsp; &nbsp; &nbsp;(g)</td>
                <td>
                  <InfoCell
                    label="calories"
                    types="number"
                    value={dataset.calories}
                  />
                </td>
              </tr>
              <tr>
                <td className="pad-right-10">탄수화물 (g)</td>
                <td>
                  <InfoCell
                    label="carbohydrate"
                    types="number"
                    value={dataset.carbohydrate}
                  />
                </td>
              </tr>
              <tr>
                <td className="pad-right-10">단백질&nbsp; &nbsp; &nbsp;(g)</td>
                <td>
                  <InfoCell
                    label="protein"
                    types="number"
                    value={dataset.protein}
                  />
                </td>
              </tr>
              <tr>
                <td className="pad-right-10">
                  지방&nbsp; &nbsp; &nbsp; &nbsp; (g)
                </td>
                <td>
                  <InfoCell label="fat" types="number" value={dataset.fat} />
                </td>
              </tr>
              <tr>
                <td className="pad-right-10">식이섬유 (g)</td>
                <td>
                  <InfoCell
                    label="fiber"
                    types="number"
                    value={dataset.fiber}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>

      <ResultToggle result={dataset.result} gl={dataset.gl}>
        결 과 보 기
      </ResultToggle>
      <SubmitButton handleSubmitClick={handleEditable}>수정 하기</SubmitButton>
    </>
  );
};

const FilledForm = ({ foodId }) => {
  const [dataset, setDataset] = useState({});

  const [editable, setEditable] = useState(false);
  const handleEditable = bool => {
    setEditable(bool);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(Utils.baseUrl + `/api/v1/foods/` + foodId, {
            withCredentials: true
          })
          .then(res => {
            console.log(foodId, "getFoodInfo");
            setDataset({ ...res.data.result });
            console.log(
              "🚀 ~ file: foodForm.jsx:374 ~ InfoForm ~ response",
              res.data.result
            );
          });
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <PageTitle>입력 정보 수정하기</PageTitle>

      <div id="info_container" className="container">
        <div id="info_inner" className="container_inner table_container">
          <Today />
          {!editable ? (
            <InfoForm dataset={dataset} handleEditable={handleEditable} />
          ) : (
            <InputForm dataset={dataset} />
          )}
          {/* <InputForm dataset={dataset} /> */}
        </div>
      </div>
    </>
  );
};

const FoodFormPage = () => {
  const { foodId } = useParams();
  const { user } = useContext(UserContext);
  /*
    const [visibility, setVisibility] = useState(false);
    const popupCloseHandler = (e) => {
      setVisibility(e);
    };
  */
  console.log("login 상태 - foodForm jsx", user.auth);

  return (
    <>
      {user ? (
        <div id="wrap" className="wrap">
          <Top />
          {!foodId ? <NewForm /> : <FilledForm foodId={foodId} />}
          <Footer />
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default FoodFormPage;
