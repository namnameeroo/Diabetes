// /* User 정보 들고 있는 컴포*/
// import React from "react";
// import axios from "axios";
// import { useContext } from "react";
// import { UserContext } from "components/userContext";
// import { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";

// import Utils from "utils";

// /**
//  * 유저 정보 가져와서 로그인 처리
//  * App.js 로부터 전달받은 상태관리 함수
//  */

// const Auth = () => {
//   const USER = { email: "", role: "", auth: false };
//   const { user, setUser } = useContext(UserContext);

//   /* eslint-disable-next-line*/
//   const [redirectUrl, setRedirectUrl] = useState(Utils.BASE_URL);

//   /* eslint-disable-next-line*/
//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         await axios
//           .get(Utils.BASE_URL + `/api/v1/users/me`, {
//             withCredentials: true
//           })
//           .then(res => {
//             const data = res.data.result;
//             console.log(res.data.result);

//             USER.email = data.email;
//             USER.role = data.role;
//             USER.auth = true;

//             console.log("🚀 ~ file: auth.jsx:32 ~ getUser ~ data", data);
//             setUser({ user: USER });
//             console.log(user);

//             // if (data.role == "ADMIN") {
//             //   setRedirectUrl(Utils.baseUrl + `/userlist`);
//             // } else if (data.role == "USER") {
//             //   setRedirectUrl(Utils.baseUrl + `/mylist`);
//             // }
//           });
//       } catch (error) {
//         console.error(error);
//         setRedirectUrl(Utils.BASE_URL + `/login`);

//         USER.email = "user email dummy";
//         USER.role = "ADMIN";
//         USER.auth = true;
//         setUser({ user: USER });
//       }
//     };

//     getUser();
//   }, [user.email]);

//   return (
//     <>
//       <Navigate to="/mylist" />
//     </>
//   );
// };
// export default Auth;
