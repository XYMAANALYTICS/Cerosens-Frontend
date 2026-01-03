import React, { useState } from "react";
import Switch from "react-switch";
import useAdminStore from "../../../../store/adminStore";
import useReportsStore from "../../../../store/reportsStore";

const AscanToggle = () => {
  const setState = useAdminStore((s) => s.setState);
  const ascan_toggle_switch = useAdminStore((s) => s.ascan_toggle_switch);
  const setState_from_report_store = useReportsStore((s)=>s.setState)
  const selectedfromdate = useReportsStore((s)=>s.selectedfromdate)
  const selectedtodate = useReportsStore((s)=>s.selectedtodate)
  const getAscan = useReportsStore((s)=>s.getAscan)

  const handleToggle = (checked) => {
    setState({ ascan_toggle_switch: checked });
  };

  const handleDownload = () => {
    getAscan();
  };


  return (
    <div className="h-[100%] flex items-center justify-center gap-2">
      {ascan_toggle_switch && (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <label>From:</label>
            <input
              type="datetime-local"
              step="1" // enables seconds
              value={selectedfromdate}
              onChange={(e) => setState_from_report_store({selectedfromdate:e.target.value})}
              className="in-field"
              required
            />
          </div>

          <div className="flex items-center gap-1">
            <label>To:</label>
            <input
              type="datetime-local"
              step="1"
              value={selectedtodate}
              onChange={(e) => setState_from_report_store({selectedtodate:e.target.value})}
              className="in-field"
              required
            />
          </div>

          <button
            onClick={handleDownload}
            className="border px-3 py-1 rounded-xl"
          >
            Download
          </button>
        </div>
      )}

      <label className="flex items-center gap-2">
        <Switch
          checked={ascan_toggle_switch}
          width={40}
          height={20}
          onChange={handleToggle}
        />
        <span>{ascan_toggle_switch ? "Hide" : "All Ascan"}</span>
      </label>
    </div>
  );
};

export default AscanToggle;
