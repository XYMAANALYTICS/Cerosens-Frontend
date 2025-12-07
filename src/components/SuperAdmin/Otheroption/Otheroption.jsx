import React from "react";

import MasterParent from "./MasterParent";
import SubChildsidebar from "./SubChildsidebar";

const Otheroption = () => {
  return (
    <div className="border w-[100%] h-[92%] p-1 flex gap-3">
      <div className="w-[10%] h-full ">
        <SubChildsidebar/>
      </div>
      <div className="w-[90%] h-full ">
        <MasterParent/>
      </div>
    </div>
  );
};

export default Otheroption;
