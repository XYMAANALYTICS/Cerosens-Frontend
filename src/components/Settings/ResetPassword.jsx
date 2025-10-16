import useSettingsStore from "../../store/settingsStore";

const ResetPassword = () => {
  const setState = useSettingsStore((s) => s.setState);

  // console.log("reset password rendered");

  return (
    <button
      className="button-style-1"
      onClick={() => {
        setState({ requestFor: "verify", passwordPopup: true });
      }}
    >
      Reset Password
    </button>
  );
};

export default ResetPassword;
