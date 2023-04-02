import axios from "axios";
import Utils from "utils";

/**
 * @typedef {Object} userData
 * @property {name}
 * @property {token}
 * @returns userData || null
 */
export const getCurrentUser = async () => {
  try {
    const userValidRes = await axios.get(Utils.BASE_URL + `/api/v1/users/me`, {
      withCredentials: true // 쿠키 정보 공유
    });

    // 세션의 user validation 체크
    if (userValidRes.status == "200") {
      console.log("getCurrentUser success");
      return userValidRes.data.result;
    } else {
      console.log("getCurrentUser fail");
    }
  } catch (error) {
    // 쿠키 없을 때 주로 여기로 걸림
    console.error(error);
  }
  return null;
};
