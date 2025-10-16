import useProtectedRouteStore from "../../store/protectedRouteStore";

const UserInfo = () => {
  const userRole = useProtectedRouteStore((s) => s.userRole);
  const userName = useProtectedRouteStore((s) => s.userName);
  const userEmail = useProtectedRouteStore((s) => s.userEmail);

  const loggedInTime = localStorage.getItem("loggedInTime");

  // console.log("user info rendered");

  return (
    <div className="bbb flex flex-col gap-4 rounded-md p-4">
      <div className="text-center font-medium">User Info</div>

      <div className="flex gap-4">
        <div>Username:</div>
        <div>{userName}</div>
      </div>

      <div className="flex gap-4">
        <div>Email:</div>
        <div>{userEmail}</div>
      </div>

      <div className="flex gap-4">
        <div>Role:</div>
        <div>{userRole}</div>
      </div>

      <div className="flex gap-4">
        <div>Last Login:</div>
        <div>{loggedInTime}</div>
      </div>
    </div>
  );
};

export default UserInfo;
