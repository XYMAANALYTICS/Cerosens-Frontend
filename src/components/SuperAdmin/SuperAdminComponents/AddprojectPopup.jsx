import React, { useEffect } from "react";
import useAdminStore from "../../../store/adminStore";
import useDataStore from "../../../store/dataStore";

const AddprojectPopup = () => {
  const count = useAdminStore((s) => s.count);
  const usercount = useAdminStore((s) => s.usercount);
  const ProjectName = useAdminStore((s) => s.ProjectName);
  const setState = useAdminStore((s) => s.setState);
  const setProjectDetails = useAdminStore((s) => s.setProjectDetails);
  const projectdata = useDataStore((s) => s.getprojectdata);
  const DeviceList = useDataStore((s) => s.DeviceList);
  // console.log("add project page is reloading");
  const resetState = useAdminStore((s) => s.resetState);

  useEffect(() => {
    projectdata();
  }, []);

  return (
    <form
      className="w-full h-full flex flex-col items-center justify-center gap-6 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        setState({ Status: "Project" });
        setProjectDetails();
        resetState();
      }}
    >
      {/* Project Name */}
      <div className="flex flex-col items-center gap-2 w-full">
        <label className="text-white text-lg font-medium">
          Enter Project Name
        </label>
        <input
          type="text"
          name="project"
          required
          value={ProjectName}
          className="in-field border rounded-md px-3 py-2 w-64 text-center"
          onChange={(e) => setState({ ProjectName: e.target.value })}
        />
      </div>

      {/* Sensor Count */}
      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-2 border-r p-2">
          <label className="text-white text-lg font-medium">
            Number of Sensors
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="border px-3 py-1 rounded-md hover-effect bg-gray-200 text-black"
              onClick={() => setState({ count: count > 0 ? count - 1 : 0 })}
            >
              -
            </button>
            <span className="text-lg font-semibold w-10 text-center">
              {count}
            </span>
            <button
              type="button"
              className="border px-3 py-1 hover-effect rounded-md bg-gray-200 text-black"
              onClick={() => setState({ count: count + 1 })}
            >
              +
            </button>
          </div>
        </div>

        {/* User Count */}
        <div className="flex flex-col items-center gap-2 p-2">
          <label className="text-white text-lg font-medium">
            Number of Users
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="border px-3 py-1 rounded-md hover-effect bg-gray-200 text-black"
              onClick={() =>
                setState({ usercount: usercount > 0 ? usercount - 1 : 0 })
              }
            >
              -
            </button>
            <span className="text-lg font-semibold w-10 text-center">
              {usercount}
            </span>
            <button
              type="button"
              className="border px-3 py-1 hover-effect rounded-md bg-gray-200 text-black"
              onClick={() => setState({ usercount: usercount + 1 })}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-5 gap-2">
          {DeviceList.map((sensor, index) => (
            <div
              key={index}
              className="border p-2 text-center rounded bg-gray-300 text-black cursor-pointer"
              onClick={() =>
                setState((prev) => {
                  // clone current array or initialize
                  const current = prev.ProjectDevices
                    ? [...prev.ProjectDevices]
                    : [];

                  // Add sensor only if not already included
                  if (!current.includes(sensor)) {
                    current.push(sensor);
                  }

                  // Sort ascending
                  current.sort((a, b) => a.localeCompare(b));

                  return {
                    ...prev,
                    ProjectDevices: current, // keep as array
                  };
                })
              }
            >
              {sensor}
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div>
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

export default AddprojectPopup;
