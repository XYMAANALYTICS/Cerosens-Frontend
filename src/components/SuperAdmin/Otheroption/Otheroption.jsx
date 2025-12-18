import React from "react";

import MasterParent from "./MasterParent";
import SubChildsidebar from "./SubChildsidebar";

const Otheroption = () => {
  return (
    <div className="w-[100%] h-[90%] p-1 flex gap-3">
      <div className="w-[10%] h-[100%] ">
        <SubChildsidebar/>
      </div>
      <div className="w-[90%] h-[100%] ">
        <MasterParent/>
      </div>
    </div>
  );
};

export default Otheroption;
