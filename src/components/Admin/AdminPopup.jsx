import useAdminStore from "../../store/adminStore";

const AdminPopup = () => {
  const confirmationPopup = useAdminStore((s) => s.confirmationPopup);
  const requestFor = useAdminStore((s) => s.requestFor);
  const newPassword = useAdminStore((s) => s.newPassword);
  const selectedUser = useAdminStore((s) => s.selectedUser);

  const setAdminData = useAdminStore((s) => s.setAdminData);
  const setState = useAdminStore((s) => s.setState);

  // console.log("confirmation popup rendered");

  return (
    confirmationPopup && (
      <div className="popup-outer text-[8px] md:text-[10px] 2xl:text-[12px]">
        <form
          className="popup-inner bg-white"
          onSubmit={(e) => {
            e.preventDefault();
            setAdminData();
          }}
        >
          <div>
            {requestFor === "reset"
              ? "Set new password for"
              : "Are you sure you want to delete the credential"}{" "}
            {selectedUser}
          </div>

          {requestFor === "reset" && (
            <input
              type="password"
              required
              value={newPassword}
              placeholder="Enter Password..."
              onChange={(e) => setState({ newPassword: e.target.value })}
              className="in-field border"
            />
          )}

          <div className="flex items-center justify-end gap-4">
            <div
              className="button-style-1 border border-green-300 text-white bg-green-500"
              onClick={() => {
                setState({
                  userId: "",
                  selectedUser: "",
                  requestFor: "",
                  newPassword: "",
                  confirmationPopup: false,
                });
              }}
            >
              Cancel
            </div>
            <button className="button-style-1 border border-red-300 text-white bg-red-500" type="submit">
              {requestFor === "reset" ? "Reset" : "Delete"}
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default AdminPopup;
