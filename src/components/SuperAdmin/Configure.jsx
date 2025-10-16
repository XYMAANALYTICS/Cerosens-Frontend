import React from "react";
import Adduser from "./SuperAdminComponents/Adduser";
import GlobalDashboard from "./SuperAdminComponents/GlobalDashboard";

const Configure = () => {
    console.log("configure page is reloading")
  return (
    <div className="h-[92%] flex flex-col gap-2 p-1">
      <div className="h-[8%]">
        <Adduser/>
      </div>
      <div className=" h-[90%]">
        <GlobalDashboard/>
      </div>
    </div>
  );
};

export default Configure;
