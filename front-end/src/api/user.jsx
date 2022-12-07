import axios from "axios";
import Utils from "utils";

// 주소 : /api/v1/users/me
// !! 이거 지금 최상단이라 에러남, User 어디에 넣을지 정해야 함

export const getUser = async () => {
  console.log("getUser inner");
  await axios.get(Utils.baseUrl + `/api/v1/users/me`, {
    withCredentials: true
  });
  console.log("getUser done");
};
