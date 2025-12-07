import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import useDataStore from "../../../../store/dataStore";
import useAdminStore from "../../../../store/adminStore";

const AscanlogDropdown = () => {
  const fetchAscanList = useDataStore((s) => s.getAscanLogList); // API call
  const ascanList = useDataStore((s) => s.GetAscanLogList); // REAL DATA
  const setState = useAdminStore((s) => s.setState);
  const ProcessName = useAdminStore((s) => s.ProcessName);
  const resetState = useAdminStore((s) => s.resetState);
  const setAscan = useAdminStore((s) => s.setAscan);

  useEffect(() => {
    resetState();
    fetchAscanList();
  }, []);

  // Create dropdown options from unique StartTime values
  const options = Array.isArray(ascanList)
    ? [...new Set(ascanList.map((item) => item.StartTime))].map((time) => ({
        value: time,
        label: time,
      }))
    : [];

  return (
    <div className="h-full w-full flex items-center justify-end">
      <div className="flex items-center justify-center gap-2">
        
        Select Ascan:
        <Dropdown
          options={options}
          value={ProcessName}
          onChange={(val) => {
            setState({ AscanLog: true, ProcessName: val.value }),
              setAscan("GetAscan");
          }}
          placeholder="Select Start Time"
          className="text-center"
        />
      </div>
    </div>
  );
};

export default AscanlogDropdown;
