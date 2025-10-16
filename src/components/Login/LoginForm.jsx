import { useEffect } from "react";
import useLoginStore from "../../store/loginStore";
import { useNavigate } from "react-router-dom";

import iconMap from "../../utils/iconMap";
import imageMap from "../../utils/imageMap";
import useProtectedRouteStore from "../../store/protectedRouteStore";

const LoginForm = () => {
  const navigate = useNavigate();

  const userLogin = useLoginStore((s) => s.userLogin);
  const username = useLoginStore((s) => s.username);
  const password = useLoginStore((s) => s.password);
  const viewPassword = useLoginStore((s) => s.viewPassword);
  const forgotPasswordUI = useLoginStore((s) => s.forgotPasswordUI);
  const setState = useLoginStore((s) => s.setState);
  const verifyAccessToken = useProtectedRouteStore((s) => s.verifyAccessToken);

  const handleLogin = async (e) => {
    e.preventDefault();
    const role = await userLogin();

    if (!role) return;
    await verifyAccessToken();

    if (role === "superAdmin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setState({ viewPassword: false });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // console.log("login form rendered");

  return (
    !forgotPasswordUI && (
      <form className="flex flex-col gap-8 items-center" onSubmit={handleLogin}>
        <img
          src={imageMap.xymaWhite}
          alt="xymaLogo"
          className="max-w-[100px]"
        />

        <div className="flex flex-col gap-8">
          <div className="flex items-center">
            <label className="w-1/2">Enter Email</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setState({ username: e.target.value })}
              required
              className="w-1/2 in-field"
            />
          </div>

          <div className="relative flex items-center">
            <label className="w-1/2">Enter Password</label>
            <input
              type={viewPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setState({ password: e.target.value })}
              required
              className="w-1/2 in-field"
            />

            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 text-lg hover:scale-110 duration-200 cursor-pointer"
              onClick={() => setState({ viewPassword: !viewPassword })}
            >
              {viewPassword ? <iconMap.IoEyeOff /> : <iconMap.IoEye />}
            </div>
          </div>

          <div className="text-xs font-medium -mt-6 flex justify-end">
            <div
              className="cursor-pointer hover:text-blue-400"
              onClick={() => setState({ forgotPasswordUI: true })}
            >
              Forgot password
            </div>
          </div>

          <button type="submit" className="button-style-2">
            LOGIN
          </button>
        </div>
      </form>
    )
  );
};

export default LoginForm;
