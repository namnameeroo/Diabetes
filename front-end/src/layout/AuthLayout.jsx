// import React from "react";

// import { useState, useEffect, useCallback } from "react";
// import { getCurrentUser } from "api/login";
// import { useRouter } from "hooks/useRouter";

// const AuthLayout = ({ children, isAdminPage }) => {
//   const [userProfile, setUserProfile] = useState({
//     userInfo: { role: "user" }
//   });
//   const { routeTo } = useRouter();
//   const fetchUserProfile = useCallback(async () => {
//     const userProfileResponse = await getCurrentUser();

//     if (userProfileResponse === null) {
//       // 현재 유저 정보 없으면 어디로 라우트할 껀지
//       return;
//     }
//     setUserProfile(userProfileResponse);
//   }, []);

//   useEffect(() => {
//     fetchUserProfile();
//   }, [children]);

//   if (isAdminPage && userProfile.userInfo.role != "Admin") {
//     // routeTo("/mylist");
//     alert("권한이 없습니다.");
//     return;
//   }

//   if (userProfile === null) {
//     routeTo("/login");
//     return;
//   }

//   return <div className="auth-layout">{children}</div>;
// };

// export default AuthLayout;
