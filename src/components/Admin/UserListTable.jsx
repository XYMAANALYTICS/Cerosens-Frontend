import useAdminStore from "../../store/adminStore";

const UserListTable = () => {
  const users = useAdminStore((d) => d.users);
  const setState = useAdminStore((d) => d.setState);

  // console.log("user table rendered");

  return (
    <div>
      <table className="overflow-auto w-full  heading-txt-color inset-shadow-sm inset-shadow-gray-400">
        <thead>
          <tr>
            <th className="t-bdr">S.No</th>
            <th className="t-bdr">Name</th>
            <th className="t-bdr">Email</th>
            <th className="t-bdr">Role</th>
            <th className="t-bdr">Accepted TC</th>
            <th className="t-bdr">Delete</th>
            <th className="t-bdr">Reset Pass</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td className="t-bdr">{i + 1}</td>
              <td className="t-bdr">{user.Name}</td>
              <td className="t-bdr">{user.Email}</td>
              <td className="t-bdr">{user.Role}</td>
              <td className="t-bdr">{user.AcceptedTC}</td>
              <td className="t-bdr">
                <button
                  className="button-style-1"
                  onClick={() => {
                    setState({
                      userId: user._id,
                      selectedUser: user.Email,
                      requestFor: "delete",
                      confirmationPopup: true,
                    });
                  }}
                >
                  Delete
                </button>
              </td>
              <td className="t-bdr">
                <button
                  className="button-style-1"
                  onClick={() => {
                    setState({
                      userId: user._id,
                      selectedUser: user.Email,
                      requestFor: "reset",
                      confirmationPopup: true,
                    });
                  }}
                >
                  Reset
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListTable;
