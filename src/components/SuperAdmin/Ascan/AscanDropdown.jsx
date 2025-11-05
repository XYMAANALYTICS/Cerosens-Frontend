import React, { useEffect } from "react";
import Dropdown from "react-dropdown";
import useDataStore from "../../../store/dataStore";
import "react-dropdown/style.css"; // important for styling
import useAdminStore from "../../../store/adminStore";

const AscanDropdown = () => {
  const getAscanList = useDataStore((s) => s.getAscanList);
  const resetState = useAdminStore((s) => s.resetState);
  const GetAscanList = useDataStore((s) => s.GetAscanList);
  const setState = useAdminStore((s) => s.setState);
  const ProcessName = useAdminStore((s) => s.ProcessName);

  useEffect(() => {
    getAscanList();
    const interval = setInterval(getAscanList, 5000);
    return () => {
      clearInterval(interval);
      resetState();
    };
  }, []);

  // ✅ Convert data to dropdown options
  const options = Array.from(
    new Set(GetAscanList?.map((item) => item.ProcessName))
  ).map((name) => ({
    value: name,
    label: name,
  }));

  return (
    <div className="">
      <Dropdown
        options={options}
        value={ProcessName}
        onChange={(val) => {
          resetState();
          setState({ Ascan: true, ProcessName: val.value });
        }}
        placeholder="Select Process"
        className="text-center"
      />
    </div>
  );
};

export default AscanDropdown;
