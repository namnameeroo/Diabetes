import React from "react";

import { useState, useEffect, useCallback } from "react";
import { getCurrentUser } from "api/login";
import { useRouter } from "hooks/useRouter";

const AuthLayout = ({ children, isAdminPage }) => {
  const [userProfile, setUserProfile] = useState({
    userInfo: { role: "USER" }
  });
  const ADMIN = "ADMIN";
  const { routeTo } = useRouter();
  const fetchUserProfile = useCallback(async () => {
    const userProfileResponse = await getCurrentUser();

    if (userProfileResponse === null) {
      // 현재 유저 정보 없으면 어디로 라우트할 껀지
      console.log("user profile : null");
      return routeTo("/login");
    }

    console.log(
      "🚀 ~ file: AuthLayout.jsx:22 ~ fetchUserProfile ~ userProfile:",
      userProfile
    );
    console.log(
      "🚀 ~ file: AuthLayout.jsx:22 ~ fetchUserProfile ~ userProfileResponse:",
      userProfileResponse
    );
    setUserProfile({ ...userProfileResponse });
  }, []);

  useEffect(() => {
    fetchUserProfile();
    if (isAdminPage && userProfile.role != ADMIN) {
      alert("권한이 없습니다.");
      return;
    }
  }, [children]);

  if (userProfile === null) {
    routeTo("/login");
    return;
  }

  return <div className="auth-layout">{children}</div>;
};

export default AuthLayout;
