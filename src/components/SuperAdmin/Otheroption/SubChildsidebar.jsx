import React from "react";
import { TbWaveSquare } from "react-icons/tb";
import { IoIosGitNetwork } from "react-icons/io";
import useAdminStore from "../../../store/adminStore";

const SubChildsidebar = () => {
    const setState = useAdminStore((s)=>s.setState)
  return (
    <div className="h-[100%] w-[100%]  flex flex-col gap-3">
      <div className="h-[20%] border border-[#38CE3C] bg-[#181824] rounded-xl flex items-center justify-center hover:cursor-pointer hover:scale-110 hover:transition-transform" onClick={()=>{setState({SubChildSidebar:"1"})}}>
        <div className="">
          <span className="flex items-center justify-center">
            <TbWaveSquare className="text-[#38CE3C] text-2xl" />
          </span>
          <span className="text-[#38CE3C] text-[8px] md:text-[10px] 2xl:text-[12px]">
            Ascan Logs
          </span>
        </div>
      </div>
      <div className="h-[20%] border border-[#38CE3C] bg-[#181824] rounded-xl flex items-center justify-center hover:cursor-pointer hover:scale-110 hover:transition-transform"  onClick={()=>{setState({SubChildSidebar:"2"})}}>
        <div className="">
          <span className="flex items-center justify-center">
            <IoIosGitNetwork className="text-[#38CE3C] text-2xl" />
          </span>
          <span className="text-[#38CE3C] text-[8px] md:text-[10px] 2xl:text-[12px]">
            Tof
          </span>
        </div>
      </div>{" "}
      <div className="h-[20%] border  rounded-xl">Add1</div>
      <div className="h-[20%] border  rounded-xl">Add2</div>
      <div className="h-[20%] border  rounded-xl">Add3</div>
    </div>
  );
};

export default SubChildsidebar;
