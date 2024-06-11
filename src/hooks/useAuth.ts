import { join, login, resetPassword, resetRequest } from "@/api/auth.api";
import { LoginProps } from "@/pages/Login";
import { useAuthStore } from "@/store/authStore";
import { useAlert } from "./useAlert";
import { useNavigate } from "react-router-dom";
import { JoinProps } from "@/pages/Join";
import { useState } from "react";

export const useAuth = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // 상태
  const { storeLogin, storeLogout, isLoggedIn } = useAuthStore();

  // 메소드
  const userLogin = (data: LoginProps) => {
    login(data).then(
      (res) => {
        // 상태 변화
        storeLogin(res.token);

        showAlert("로그인이 완료되었습니다.");
        navigate("/");
      },
      (error) => {
        showAlert("로그인에 실패하였습니다.");
      }
    );
  };

  const userJoin = (data: JoinProps) => {
    join(data).then((res) => {
      // 성공
      showAlert("회원가입이 완료되었습니다.");
      navigate("/login");
    });
  };

  const userResetPassword = (data: JoinProps) => {
    resetPassword(data).then(() => {
      showAlert("비밀번호가 초기화되었습니다.");
      navigate("/login");
    });
  };

  const [resetRequested, setResetRequested] = useState(false);

  const userResetRequest = (data: JoinProps) => {
    resetRequest(data).then(() => {
      setResetRequested(true);
    });
  };

  // 리턴
  return {
    userLogin,
    userJoin,
    userResetPassword,
    userResetRequest,
    resetRequested,
  };
};
