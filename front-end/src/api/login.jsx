import axios from "axios";
import Utils from "utils";

/**
 *
 * @typedef {Object} userData
 * @property {name}
 * @property {token}
 *
 * @returns userData || null
 */
export const getCurrentUser = async () => {
  try {
    const userValidRes = await axios.get(Utils.BASE_URL + `/api/v1/users/me`, {
      withCredentials: true // 쿠키 정보 공유
    });

    console.log(
      "🚀 ~ file: login.jsx:16 ~ getCurrentUser ~ userValidRes:",
      JSON.stringify(userValidRes)
    );

    // 반환값 체크
    if (userValidRes.statusText == "OK") {
      console.log(JSON.stringify(userValidRes.data));
      return userValidRes;
    } else {
      console.log("getCurrentUser api fail");
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};
