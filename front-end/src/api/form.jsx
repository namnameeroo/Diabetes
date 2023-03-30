import axios from "axios";
import Utils from "utils";

const PopUpSuccess = msg => {
  // 모달로 바꿔야 함
  alert(msg);
};

/**
 * @typedef {Object} inputData
 * @property {id, provider, entireWeight, calories,
 *           carbonhydrate, protein, fat, intake, gl,
 *           result, createdDate, modifiedDate}
 * @param {*} inputData
 * @returns id
 */
export const postFood = async inputs => {
  try {
    const postFoodRes = await axios
      .post(Utils.BASE_URL + `/api/v1/foods`, inputs, { withCredentials: true })
      .then(res => {
        console.log(res);
        console.log(JSON.stringify(res)); // TODO: 제거
      });
    if (postFoodRes.data.message == "SUCCESS") {
      // status 확인 필요
      PopUpSuccess("결과가 저장되었습니다.");
      return true;
    }
    console.log(postFoodRes.status); // TODO: 제거
    return false;
  } catch (e) {
    console.error(e);
  }
};
