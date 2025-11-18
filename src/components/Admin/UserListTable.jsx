import useAdminStore from "../../store/adminStore";

const UserListTable = () => {
  const users = useAdminStore((d) => d.users);
  const setState = useAdminStore((d) => d.setState);

  return (
    <div
      className="overflow-y-auto"
      style={{
        maxHeight: "100%",
        scrollbarWidth: "thin",
        scrollbarColor: "#DCDEDD transparent",
      }}
    >
      <table className="w-full border-collapse text-size">
        {/* ---------- TABLE HEADER ---------- */}
        <thead className="text-black sticky top-0 bg-white shadow-md text-[8px] md:text-[10px] 2xl:text-[12px]">
          <tr className="parent-bg">
            <th className="py-3 px-2 text-left">S.No</th>
            <th className="py-3 px-2 text-left">Name</th>
            <th className="py-3 px-2 text-left">Email</th>
            <th className="py-3 px-2 text-left">Role</th>
            <th className="py-3 px-2 text-left">Accepted TC</th>
            <th className="py-3 px-2 text-left">Delete</th>
            <th className="py-3 px-2 text-left">Reset Pass</th>
          </tr>
        </thead>

        {/* ---------- TABLE BODY ---------- */}
        <tbody className="text-[8px] md:text-[11px] 2xl:text-[12px]">
          {users.map((user, i) => (
            <tr
              key={i}
              className="border-b border-gray-300 odd:bg-gray-50 hover:bg-gray-200 transition"
            >
              <td className="py-2 px-2">{i + 1}</td>
              <td className="py-2 px-2">{user.Name}</td>
              <td className="py-2 px-2">{user.Email}</td>
              <td className="py-2 px-2">{user.Role}</td>
              <td className="py-2 px-2">{user.AcceptedTC}</td>

              {/* Delete Button */}
              <td className="py-2 px-2">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
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

              {/* Reset Button */}
              <td className="py-2 px-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
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
