import React, { useEffect } from "react";
import UserListTable from "./UserListTable";

const GlobalDashboard = () => {

  return (
    <div className="w-full h-full flex flex-col gap-2 ">
      <div className="h-[50%]">
          <UserListTable />
      </div>
      <div className="h-[50%] card-bg p-1 rounded-md heading-txt-color inset-shadow-sm inset-shadow-gray-400 ">
        <div></div>
      </div>
    </div>
  );
};

export default GlobalDashboard;
