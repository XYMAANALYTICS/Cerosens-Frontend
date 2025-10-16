import useSettingsStore from "../../store/settingsStore";
import useProtectedRouteStore from "../../store/protectedRouteStore";

const Settingspopup = () => {
  const setSettingsData = useSettingsStore((s) => s.setSettingsData);
  const requestFor = useSettingsStore((s) => s.requestFor);
  const oldPassword = useSettingsStore((s) => s.oldPassword);
  const newPassword = useSettingsStore((s) => s.newPassword);
  const passwordPopup = useSettingsStore((s) => s.passwordPopup);
  const setState = useSettingsStore((s) => s.setState);
  const resetState = useSettingsStore((s) => s.resetState);

  const userName = useProtectedRouteStore((s) => s.userName);
  const userEmail = useProtectedRouteStore((s) => s.userEmail);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSettingsData(userEmail, userName);
  };

  // console.log("settings popup rendered");

  return (
    passwordPopup && (
      <div className="popup-outer">
        <form className="popup-inner" onSubmit={handleSubmit}>
          {requestFor === "verify" ? (
            <>
              <label>Enter old password</label>

              <input
                type="password"
                required
                value={oldPassword}
                onChange={(e) => setState({ oldPassword: e.target.value })}
                placeholder="Old password..."
                className="in-field"
              />
            </>
          ) : (
            <>
              <label>Enter new password</label>

              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setState({ newPassword: e.target.value })}
                placeholder="New password..."
                className="in-field"
              />
            </>
          )}

          <div className="flex gap-4 items-center justify-end">
            <div className="button-style-1" onClick={resetState}>
              Cancel
            </div>

            <button className="button-style-1" type="submit">
              {requestFor === "verify" ? "Verify" : "Reset"}
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default Settingspopup;
