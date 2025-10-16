import UserInfo from "../components/Settings/UserInfo";
import ResetPassword from "../components/Settings/ResetPassword";
import Settingspopup from "../components/Settings/Settingspopup";

const Settings = () => {
  return (
    <div className="min-h-screen xl:h-screen p-4 flex flex-col items-start gap-4 text-gray-200">
      {/* user info */}
      <UserInfo />

      {/* reset password */}
      <ResetPassword />

      {/* popup */}
      <Settingspopup />
    </div>
  );
};

export default Settings;
