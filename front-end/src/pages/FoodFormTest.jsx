import React from "react";
/* eslint-disable */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import Utils from "utils";

import Top from "components/top";
import PageTitle from "components/pageTitle";
import Footer from "components/footer";
import ResultToggle from "components/toggle";
import { getGl } from "components/gl";

import { useNavigate } from "react-router-dom";
import db from "db.json";
import { FORM_ITEMS } from "const/formItems";

import "styles/main.css";

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
const handleSubmitClick = async e => {
  console.log(e.target, "submit target check");
  console.log("저장합니다.");

  // if (inputs.gl === "" || !toggleOpen) {
  //   onToggle();
  //   const post = await postFood(inputs);
  //   if (post) {
  //     () => confirm("저장했습니다. 목록페이지로 이동합니다.") && navigate(-1);
  //     // 이전 페이지로 이동
  //   }
  // } else if (formValidation()) {
  //   const post = await postFood(inputs);
  //   if (post) {
  //     () => confirm("저장했습니다. 목록페이지로 이동합니다.") && navigate(-1);
  //     // 이전 페이지로 이동
  //   }
  // }

  /**
   * 저장 후 액션을 'food/info/:id' 로 이동하도록 하기
   * => 수정하기 버튼 && readonly 인지 확인
   */
};

const FormContent = ({ dataset, isEditable }) => {
  // const [infos, setInfos] = useState({
  // foodName: "",
  // provider: "",
  // entireWeight: "",
  // calories: "",
  // carbohydrate: "",
  // protein: "",
  // fat: "",
  // fiber: "",
  // intake: "",
  // remains: "",
  // gl: "",
  // result: ""
  // });

  const [inputs, setInputs] = useState({
    name: "", // == foodName, 반환 데이터 키가 name
    // foodName: "",
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

  useEffect(() => {
    // dataset 세팅
    if (dataset) {
      console.log(
        "🚀 ~ file: FoodFormTest.jsx:80 ~ useEffect ~ dataset:",
        dataset
      );
      setInputs({ ...dataset });
    }
  }, [dataset]);

  /* eslint-disable-next-line*/
  // const {
  //   userId,
  //   name,
  //   foodName,
  //   provider,
  //   entireWeight,
  //   calories,
  //   carbohydrate,
  //   protein,
  //   fat,
  //   fiber,
  //   intake,
  //   remains,
  //   gl,
  //   result
  // } = inputs;

  const onChangeInput = e => {
    const { name, value } = e.target;
    console.log(e.target, "target");
    const nextInput = {
      ...inputs,
      [name]: value
    };
    setInputs(nextInput);
  };

  const onChangeInputForNum = e => {
    const getNumOnly = content => {
      let nums = content.replaceAll(/[^0-9.]*/g, "");
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

    const { name, value } = e.target;
    if (isNaN(value)) {
      setMsg("숫자만 입력해주세요.");
    }
    const nextInput = {
      ...inputs,
      [name]: getNumOnly(value)
    };
    setInputs(nextInput);
    // setToggleOpen(false);
    // 값이 변경되면 GL 결과를 다시 닫음
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
    console.log(JSON.stringify(inputs));
  };

  const onSubmit = e => {
    e.preventDefault(); // 폼전송시 리액트 상태 초기화를 막음
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="main_wrap table_wrap">
          <table className="simple_font form-table">
            <tbody>
              {FORM_ITEMS.map((item, key) => {
                return (
                  <tr key={key}>
                    <td className="pad-right-10 space-between">
                      <span>{item.title}</span>
                      <span className="gray-txt">{item.unitsign}</span>
                    </td>
                    <td>
                      <div className="input_item" id="input_item_id">
                        <input
                          className="input_text"
                          name={item.label}
                          onChange={
                            item.types == "number"
                              ? onChangeInputForNum
                              : onChangeInput
                          }
                          value={inputs[item.label] ? inputs[item.label] : ""}
                          placeholder={item.placeholder && item.placeholder}
                          types={item.types && item.types}
                          disabled={!isEditable}
                        ></input>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </form>

      <ResultToggle result={inputs.result} gl={inputs.gl}>
        결 과 보 기
      </ResultToggle>
    </>
  );
};

const FoodFormTest = () => {
  const { foodId } = useParams();
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [dataset, setDataset] = useState({});

  const handleEditable = bool => {
    // setIsReadOnly(!bool);
    setIsReadOnly(false);
    console.log(isReadOnly);
  };

  useEffect(() => {
    if (foodId) {
      // fetch 요청
      // data setting
      console.log(db.foodlist); // !!!! 여기 제거 해야 함
      setDataset(db.foodlist.result[0]); // !!!! 여기 제거
      setIsReadOnly(true);
    } else {
      setIsReadOnly(false);
    }
  }, [foodId]);

  return (
    <>
      <div id="wrap" className="wrap">
        <Top />

        <PageTitle>{foodId ? "입력값 수정하기" : "새로  입력하기"}</PageTitle>

        <div id="info_container" className="container">
          <div id="info_inner" className="container_inner table_container">
            <FormContent
              dataset={dataset ? dataset : null}
              isEditable={isReadOnly ? false : true}
            />

            {isReadOnly ? (
              <SubmitButton handleSubmitClick={handleEditable}>
                수 정 하 기
              </SubmitButton>
            ) : (
              <SubmitButton handleSubmitClick={handleSubmitClick}>
                저 장 하 기
              </SubmitButton>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
export default FoodFormTest;
