import React from "react";
import Switch from "react-switch";
import useAdminStore from "../../../../store/adminStore";

const AscanToggle = () => {
  const setState = useAdminStore((s) => s.setState);
  const ascan_toggle_switch = useAdminStore((s) => s.ascan_toggle_switch);

  const handleToggle = (checked) => {
    setState({ ascan_toggle_switch: checked });
  };

  return (
    <div className="h-[100%]  flex items-center justify-center gap-2">
      {ascan_toggle_switch ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <label>From:</label>
            <input type="date" required className="in-field 2/3" />
          </div>
          <div className="flex items-center gap-1">
            <label>To:</label>
            <input type="date" required className="in-field 2/3" />
          </div>
          <button className="border p-1 w-[20%] rounded-xl"> Plot</button>
        </div>
      ) : (
        <></>
      )}

      <label className="flex items-center justify-center h-[100%]">
        <Switch
          checked={ascan_toggle_switch}
          width={40}
          height={20}
          onChange={handleToggle}
        />
        <span>{!ascan_toggle_switch ? (<>All Ascan</>):(<>Hide</>)}</span>
      </label>
    </div>
  );
};

export default AscanToggle;
