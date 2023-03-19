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
  const userValidRes = await axios.get(`${Utils.BASE_URL}/api/v1/users/me`, {
    withCredentials: true // 쿠키 정보 공유
  });

  if (userValidRes.ok) {
    console.log(JSON.stringify(userValidRes.data));
  } else {
    console.log("getCurrentUser api fail");
  }

  return;
};
