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
import { postFood, getFoodById, updateFood } from "api/foodForm";

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

const FormContent = ({ fetchedData, isEditable, handleEditable }) => {
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

  /**
   * fetch된 데이터 존재하면, input 미리 채우기
   */
  useEffect(() => {
    // dataset 세팅
    if (fetchedData) {
      console.log(
        "🚀 ~ file: FoodFormTest.jsx:80 ~ useEffect ~ dataset:",
        fetchedData
      );
      setInputs({ ...fetchedData });
    }
  }, [fetchedData]);

  const navigate = useNavigate();
  /**
   * 저장 버튼 누르면, form에 입력되어 있는 데이터 POST 전송
   * @param {*} e
   */
  const handleSubmitClick = async e => {
    console.log("저장합니다.", " is it fetched? => ", fetchedData);

    onToggle();
    // if (inputs.gl === "" || !toggleOpen) {
    // gl결과값 있는 지 확인, toggle open
    // }

    if (fetchedData.hasOwnProperty("id") && fetchedData.id) {
      // fetch data 인지, new data 인지 구분
      const updateRes = await updateFood(inputs);
      if (updateRes) {
        () => confirm("저장했습니다.") && navigate("/foodForm/info/" + "1");
      }
    } else {
      const postRes = await postFood(inputs);
      if (postRes) {
        () => confirm("저장했습니다.") && navigate("/foodForm/info/" + "1");
      }
      /**
       * 저장 후 액션을 'food/info/:id' 로 이동하도록 하기
       * navigate("/foodForm/info/" + foodId); 로 이동
       * => 수정하기 버튼 && readonly 인지 확인
       */
    }
  };

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
    // if (isNaN(value)) {
    //   setMsg("숫자만 입력해주세요.");
    // }

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
    e.preventDefault(); // 폼전송시 리액트 상태 초기화 방지
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

      {isEditable ? (
        <SubmitButton handleSubmitClick={handleSubmitClick}>
          저 장 하 기
        </SubmitButton>
      ) : (
        <SubmitButton handleSubmitClick={handleEditable}>
          수 정 하 기
        </SubmitButton>
      )}
    </>
  );
};

const FoodFormTest = () => {
  const { foodId } = useParams();
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [fetchedData, setFetchedData] = useState({});

  const handleEditable = bool => {
    // setIsReadOnly(!bool);
    setIsReadOnly(false);
  };

  useEffect(() => {
    if (foodId) {
      // fetch 요청
      const getFoodResult = async () => {
        const getFoodResponse = await getFoodById(foodId);
        console.log(
          "🚀 ~ file: FoodFormPage.jsx:260 ~ getFoodResult ~ getFoodResponse:",
          getFoodResponse
        );
        return getFoodResponse;
      };

      const newFetchedData = getFoodResult();
      // const newFetchedData = db.foodlist.result[0]; // TODO 제거
      if (newFetchedData) {
        setFetchedData(newFetchedData);
        setIsReadOnly(true);
      } else {
        console.log("food get api 실패");
      }
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
              fetchedData={
                Object.keys(fetchedData).length != 0 ? fetchedData : null
              }
              isEditable={isReadOnly ? false : true}
              handleEditable={handleEditable}
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
export default FoodFormTest;
