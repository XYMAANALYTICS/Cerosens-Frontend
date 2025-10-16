import React, { useEffect } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import useDataStore from "../../../store/dataStore";
import useAdminStore from "../../../store/adminStore";

const AdduserPopup = () => {
  const projectdata = useDataStore((s) => s.getprojectdata);
  const setProjectDetails = useAdminStore((s) => s.setProjectDetails);
  const ProjectName = useDataStore((s) => s.ProjectName);
  const DeviceList = useDataStore((s) => s.UserDeviceist);
  const setState = useAdminStore((s) => s.setState);
  const Username = useAdminStore((s) => s.Username);
  const UserID = useAdminStore((s) => s.UserID);
  const Password = useAdminStore((s) => s.Password);
  const UserProjectName = useAdminStore((s) => s.UserProjectName);
  const RoleAccess = useAdminStore((s) => s.RoleAccess);
  const ProjectDevices = useAdminStore((s) => s.ProjectDevices);
  console.log("add user page is reloading");

  useEffect(() => {
    projectdata();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({
      Status: "UserAdd",
      Username,
      UserID,
      Password,
      UserProjectName: UserProjectName,
      RoleAccess: RoleAccess,
      ProjectDevices,
    });
    setProjectDetails();
  };
  // console.log("yess..",DeviceList);
  return (
    <form
      className="w-[100%] h-[100%] flex flex-col items-center justify-center gap-6 p-4 "
      onSubmit={handleSubmit}
    >
      {/* Project Name */}
      <div className="flex gap-4  h-[20%] w-full">
        <div className="flex flex-col items-center gap-2 w-full">
          <label className="text-white font-medium">Select Project Name</label>
          <Dropdown
            options={ProjectName}
            value={UserProjectName}
            onChange={(val) => {
              setState({ UserProjectName: val.value });
              projectdata(`GetProjectDevice-${val.value}`);
            }}
            placeholder="Select"
            className="h-8"
          />
        </div>
        <div className="flex flex-col items-center gap-2 w-full">
          <label className="text-white font-medium">User Name</label>
          <input
            type="text"
            value={Username}
            onChange={(e) => setState({ Username: e.target.value })}
            className="in-field border rounded-md px-3 py-2 w-44 h-8 text-center"
          />
        </div>
      </div>

      <div className="flex gap-4 h-[20%] w-full ">
        <div className="flex flex-col items-center gap-2 w-full">
          <label className="text-white font-medium">User ID</label>
          <input
            type="text"
            value={UserID}
            onChange={(e) => setState({ UserID: e.target.value })}
            className="in-field border rounded-md px-3 py-2 w-44 text-center h-8"
          />
        </div>
        <div className="flex flex-col items-center gap-2 w-full">
          <label className="text-white font-medium">Password</label>
          <input
            type="password"
            value={Password}
            onChange={(e) => setState({ Password: e.target.value })}
            className="in-field border rounded-md px-3 py-2 w-44 text-center h-8"
          />
        </div>
      </div>

      {/* Role Selection */}
      <div className="flex gap-4 h-[5%] w-full  items-center justify-center">
        <label className="flex items-center justify-center gap-2">
          <input
            type="radio"
            name="role"
            checked={RoleAccess === "User"}
            onChange={() => setState({ RoleAccess: "User" })}
          />
          User
        </label>
        <label className="flex items-center justify-center gap-2">
          <input
            type="radio"
            name="role"
            checked={RoleAccess === "Admin"}
            onChange={() => setState({ RoleAccess: "Admin" })}
          />
          Admin
        </label>
      </div>

      {/* Sensor List */}
      <div className="flex items-center justify-center h-[5%] w-full ">
        <label className="text-white text-lg font-medium flex items-center justify-center">
          Select Project Devices
        </label>
      </div>
      <div className="grid grid-cols-5 gap-2 h-[50%] w-full border overflow-auto">
        {DeviceList.map((sensor, index) => (
          <div
            key={index}
            className={`border h-[30%] flex items-center justify-center p-2 text-center rounded cursor-pointer ${
              ProjectDevices.includes(sensor)
                ? "bg-green-400 text-black"
                : "bg-gray-300 text-black"
            }`}
            onClick={() =>
              setState((prev) => ({
                ProjectDevices: prev.ProjectDevices
                  ? `${prev.ProjectDevices},${sensor}`
                  : sensor,
              }))
            }
          >
            {sensor}
          </div>
        ))}
      </div>

      <div className="h-[10%] w-full flex items-center justify-center">
        <button
          type="submit"
          className="hover-effect px-6 py-2 bg-green-400 text-black font-medium rounded-md hover:bg-green-500 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AdduserPopup;
