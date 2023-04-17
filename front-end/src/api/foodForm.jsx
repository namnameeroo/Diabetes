import axios from "axios";
import Utils from "utils";

/**
 * @typedef {Object} inputData
 * @property {id, name, provider, entireWeight,
 *            calories, carbonhydrate, protein, fat, intake,
 *            gl, result, createdDate, modifiedDate}
 * @param {*} inputData
 * @returns id || null
 */
export const postFood = async inputs => {
  const postFoodRes = await axios.post(
    Utils.BASE_URL + `/api/v1/foods`,
    inputs,
    { withCredentials: true }
  );

  if ((await postFoodRes.data.message) == "SUCCESS") {
    return postFoodRes.data.result.id;
  }
  // return false;
  return null;
};

/**
 *
 * @param {*} foodId
 * @returns foodInfo || null
 */
export const getFoodById = async foodId => {
  const getFoodByIdRes = await axios.get(
    Utils.BASE_URL + `/api/v1/foods/` + foodId,
    {
      withCredentials: true
    }
  );

  if (getFoodByIdRes.data.message == "SUCCESS") {
    // 표시할 데이터 반환
    console.log("getFood success");
    return getFoodByIdRes.data.result;
  } else {
    console.log("getFood fail");
    return null;
  }
};

/**
 * @typedef {Object} inputData
 * @property {id, name, provider, entireWeight,
 *            calories, carbonhydrate, protein, fat, intake,
 *            gl, result, createdDate, modifiedDate}
 * @param {*} inputData
 * @returns id || null
 */
export const updateFood = async inputs => {
  try {
    const updateFoodRes = await axios.put(
      Utils.BASE_URL + `/api/v1/foods/` + inputs.id,
      inputs,
      { withCredentials: true }
    );

    console.log(JSON.stringify(updateFoodRes.data.result));
    if (updateFoodRes.data.message == "SUCCESSFULLY UPDATE") {
      return updateFoodRes.data.result.id;
    }
  } catch (error) {
    // return false;
    return null;
  }
};
export const updateFoodByAdmin = async inputs => {
  const updateFoodRes = await axios.put(
    Utils.BASE_URL + `/api/v1/admin/foods/` + inputs.id,
    inputs,
    { withCredentials: true }
  );

  console.log("update by admin", JSON.stringify(updateFoodRes.data.result));
  if (updateFoodRes.data.message == "SUCCESSFULLY UPDATE") {
    return updateFoodRes.data.result.id;
  }

  // return false;
  return null;
};
