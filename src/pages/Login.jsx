import { useEffect } from "react";
import imageMap from "../utils/imageMap";

import LoginForm from "../components/Login/LoginForm";
import ForgotPasswordForm from "../components/Login/ForgotPasswordForm";

const Login = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div
      className="min-h-screen xl:h-screen flex justify-center items-center text-white text-sm 2xl:text-base"
      style={{
        backgroundImage: `url(${imageMap.loginCover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative backdrop-blur-md p-4 bbb rounded-md shadow-2xl">
        <LoginForm />
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default Login;
