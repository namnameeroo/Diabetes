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
      userValidRes
    );

    // 반환값 체크
    if (userValidRes.status == "200") {
      console.log(userValidRes.data.result);
      console.log("getCurrentUser api success");

      return userValidRes.data.result;
    } else {
      console.log("getCurrentUser api fail");
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};
