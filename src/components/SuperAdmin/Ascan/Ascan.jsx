import React, { useEffect, useRef } from "react";
import Dropdown from "react-dropdown";
import useDataStore from "../../../store/dataStore";
import useAdminStore from "../../../store/adminStore";
import AscanPloting from "./AscanPloting";
import paramters from "../../../store/addparameter";
import AscanDropdown from "./AscanDropdown";

const Ascan = () => {
  const projectdata = useDataStore((s) => s.getprojectdata);
  const ProjectName = useDataStore((s) => s.UserDeviceist);
  const UserProjectName = useAdminStore((s) => s.UserProjectName);
  const setState = useAdminStore((s) => s.setState);
  const setAscan = useAdminStore((s) => s.setAscan);
  const Pulse_width = useAdminStore((s) => s.Pulse_width);
  const Amplitude = useAdminStore((s) => s.Amplitude);
  const Frequency = useAdminStore((s) => s.Frequency);
  const Gain = useAdminStore((s) => s.Gain);
  const Filter = useAdminStore((s) => s.Filter);
  const Msps = useAdminStore((s) => s.Msps);
  const start = useAdminStore((s) => s.start);
  const Stop = useAdminStore((s) => s.Stop);
  const setSettingsDetails = useAdminStore((s) => s.setSettingsDetails);
  const DevicesetState = paramters((s) => s.setState);
  const Deviceselect = paramters((s) => s.Deviceselect);
  const TrailNamePopup = paramters((s) => s.TrailNamePopup);
  const ProcessName = useAdminStore((s) => s.ProcessName);
  const chartRef = useRef(null);
  const resetState = useAdminStore((s) => s.resetState);

  useEffect(() => {
    projectdata("GetProjectDevice");
  }, []);

  // console.log("Deviceselect=", Deviceselect);
  return (
    <div className="h-[90%] w-full p-4 flex gap-4">
      {/* Sidebar / Form */}
      <form
        className="w-[22%] bg-gray-800/80 rounded-xl shadow-lg flex flex-col overflow-hidden"
        onSubmit={(e) => {
          e.preventDefault();
          setSettingsDetails("GetSettings");
        }}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#E3E3E3 transparent",
        }}
      >
        <div className="flex flex-col gap-1 p-2">
          <label className="text-white font-medium">Device Name:</label>
          <Dropdown
            options={ProjectName}
            value={UserProjectName}
            onChange={(val) => {
              resetState();
              setState({ UserProjectName: val.value });
              setSettingsDetails("GetSettingsDatas");
            }}
            placeholder="Select Device"
            className="text-center"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
          {[
            { label: "Pulse Width", value: Pulse_width, name: "Pulse_width" },
            { label: "Amplitude", value: Amplitude, name: "Amplitude" },
            { label: "Frequency", value: Frequency, name: "Frequency" },
            { label: "Gain", value: Gain, name: "Gain" },
            { label: "Filter", value: Filter, name: "Filter" },
            { label: "Msps", value: Msps, name: "Msps" },
            { label: "Start", value: start, name: "start" },
            { label: "Stop", value: Stop, name: "Stop" },
          ].map((item) => (
            <div key={item.name} className="flex flex-col gap-1">
              <label className="text-white font-medium">{item.label}</label>
              <input
                type="number"
                value={item.value}
                required
                onChange={(e) => setState({ [item.name]: e.target.value })}
                className="border border-gray-400 text-gray-300 rounded-md px-3 py-1 w-full text-center focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
              />
            </div>
          ))}
        </div>

        <div className="p-2">
          <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-transform transform hover:scale-105">
            Submit
          </button>
        </div>
      </form>

      {/* Chart Section */}
      <div className="w-[78%] h-[100%] bg-gray-900/80 rounded-xl shadow-lg flex flex-col overflow-hidden">
        {/* Chart Controls */}
        <div className="h-[60px] w-full flex justify-end gap-2 p-2 border-b border-gray-700">
          {/* {["Download", "Dropdown"].map((btn) => ( */}
            <div
              className="border border-cyan-500 text-cyan-500 px-3 py-1 rounded-md hover:bg-cyan-500 hover:text-white cursor-pointer transition-colors duration-200 flex items-center justify-center"
              // onClick={btn==="Dropdown"}
            >
              Download
            </div>
            <div
              className=""
            >
              <AscanDropdown/>
              
            </div>
          {/* ))} */}
          <div
            className="border border-green-500 text-green-500 px-3 py-1 rounded-md hover:bg-green-500 hover:text-white cursor-pointer transition-colors duration-200 flex items-center justify-center"
            onClick={() => {
              if (UserProjectName) {
                DevicesetState({ TrailNamePopup: true });
              } else {
                DevicesetState({ Deviceselect: true });
              }
            }}
          >
            Start
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1 min-h-0 p-2">
          <AscanPloting chartRef={chartRef} />
        </div>
      </div>
      {Deviceselect && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
            <div className="mb-3">
              Please select the device and then click Start.
            </div>
            <button
              className="border px-4 py-1 rounded-lg hover:bg-red-400 hover:text-white border-red-400 text-red-400 hover:scale-110 hover-effect"
              onClick={() => DevicesetState({ Deviceselect: false })}
            >
              Ok
            </button>
          </div>
        </div>
      )}
      {TrailNamePopup && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
            <div className="mb-2">
              <span>Trail Name : </span>
              <input
                type="text"
                className="border px-2"
                value={ProcessName.value}
                required
                onChange={(e) => setState({ ProcessName: e.target.value })}
              />
            </div>
            <div>
              <button
                className="border px-2 rounded-xl text-green-400 hover:bg-green-400 hover:text-white hover-effect"
                onClick={() => {
                  setState({ Ascan: true });
                  setAscan("StartAscan");
                  DevicesetState({TrailNamePopup :false})
                  resetState();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ascan;
