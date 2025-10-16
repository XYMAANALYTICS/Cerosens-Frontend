import { useEffect } from "react";

import RegisterForm from "../components/Admin/RegisterForm";
import UserListTable from "../components/Admin/UserListTable";
import AdminPopup from "../components/Admin/AdminPopup";
import UserActivityFilter from "../components/Admin/UserActivityFilter";
import TableContainer from "../components/Common/TableContainer";

import useAdminStore from "../store/adminStore";

const Admin = () => {
  const getAdminData = useAdminStore((s) => s.getAdminData);
  const resetState = useAdminStore((s) => s.resetState);

  useEffect(() => {
    getAdminData();

    return () => {
      resetState();
    };
  }, []);

  return (
    <div className="h-[92%] p-2 flex flex-col gap-2 border">
      <div className="flex gap-2 h-[50%]">
        {/* register users */}
        <RegisterForm />

        {/* users table */}
        <div className="w-full h-[100%] card-bg p-1 rounded-xl ">
          <UserListTable />
        </div>
      </div>

      <div className="flex flex-col gap-2  h-[50%]">
        {/* filter user activity */}
        <UserActivityFilter />

        {/* user activity table */}
        <div className="overflow-y-auto h-[300px] table-style">
          <TableContainer fromPage={"admin"} />
        </div>
      </div>

      {/* confirmation popup */}
      <AdminPopup />
    </div>
  );
};

export default Admin;
