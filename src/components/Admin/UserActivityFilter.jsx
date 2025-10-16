import useAdminStore from "../../store/adminStore";

const UserActivityFilter = () => {
  const users = useAdminStore((d) => d.users);
  const filterUser = useAdminStore((d) => d.filterUser);
  const filterActivity = useAdminStore((d) => d.filterActivity);
  const setState = useAdminStore((s) => s.setState);

  // console.log("user actvity filter rendered");

  return (
    <div className="flex items-center gap-4 overflow-auto w-full rounded-2xl card-bg heading-txt-color inset-shadow-sm inset-shadow-gray-400">
      <div>Filter:</div>

      {/* user based filter */}
      <label>User:</label>
      <select
        className="in-field text-center btn-bg"
        value={filterUser}
        onChange={(e) => setState({ filterUser: e.target.value })}
      >
        <option value="">--All--</option>

        {users.map((user, i) => (
          <option key={i} value={user.Email}>
            {user.Email}
          </option>
        ))}
      </select>

      {/* activity based filter */}
      <label>Activity</label>

      <select
        className="in-field text-center btn-bg"
        value={filterActivity}
        onChange={(e) => setState({ filterActivity: e.target.value })}
      >
        <option value="">--All--</option>

        {/* track and add activities based on requirements */}
        <option value="Login">Login</option>
        <option value="Logout">Logout</option>
        <option value="Verified-Old-Password">Verify Old Password</option>
        <option value="Reset-Password">Reset Password</option>
        <option value="Reports-Download:dateWise">
          Datewise Reports Download
        </option>
        <option value="Reports-Download:countWise">
          Countwise Reports Download
        </option>
      </select>
    </div>
  );
};

export default UserActivityFilter;
