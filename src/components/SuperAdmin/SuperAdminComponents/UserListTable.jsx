import React, { useEffect } from "react";
import useAdminStore from "../../../store/adminStore";
import { PieChart } from "@mui/x-charts/PieChart";

const UserListTable = () => {
  const setState = useAdminStore((s) => s.setState);
  const setProjectDetails = useAdminStore((s) => s.setProjectDetails);
  const gettabledatas = useAdminStore((s) => s.UsertableList);
  useEffect(() => {
    setState({ Status: "GetDetails" });
    setProjectDetails();
  }, []);

  // console.log("total users finding=", 100 - 3);
  const data = [
    { label: "User", value: gettabledatas.length, color: "#FFBE26" },
    { label: "InActive", value: 100 - gettabledatas.length, color: "#00BA21" },
  ];

  const settings = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    hideLegend: true,
  };

  return (
    <div className=" flex gap-2 h-full w-full ">
      <div className="w-[30%] flex items-center justify-center card-bg   rounded-md heading-txt-color shadow-lg">
        <PieChart
          series={[
            { innerRadius: 50, outerRadius: 100, data, arcLabel: "value" },
          ]}
          {...settings}
        />
      </div>
      <div className="w-[70%] card-bg p-2 heading-txt-color overflow-auto border-[#bae9bc] shadow-md  rounded-xl" 
      style={{
        maxHeight: "100%",
        scrollbarWidth: "thin",
        scrollbarColor: "#DCDEDD transparent",
      }}>
      <table className="w-full border-collapse text-[8px] md:text-[10px] 2xl:text-[12px]">
        <thead className="sticky top-0 parent-bg text-gray-900 shadow-sm">
            <tr>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-300">S.No</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-300">ProjectName</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-300">Username</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-300">Role</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-300">UserID</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-300">Sensors</th>
              <th className="px-3 py-3 text-left font-semibold border-b border-gray-300">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {gettabledatas &&
              gettabledatas.map((data, i) => (
                <tr key={i}>
                  <td className="p-2 odd:bg-white even:bg-gray-50 hover:bg-gray-200 transition border-b border-gray-300">{i + 1}</td>
                  <td className="p-2 odd:bg-white even:bg-gray-50 hover:bg-gray-200 transition border-b border-gray-300">{data.ProjectName}</td>
                  <td className="p-2 odd:bg-white even:bg-gray-50 hover:bg-gray-200 transition border-b border-gray-300">{data.Username}</td>
                  <td className="p-2 odd:bg-white even:bg-gray-50 hover:bg-gray-200 transition border-b border-gray-300">{data.Role}</td>
                  <td className="p-2 odd:bg-white even:bg-gray-50 hover:bg-gray-200 transition border-b border-gray-300">{data.UserID}</td>
                  <td className="p-2 odd:bg-white even:bg-gray-50 hover:bg-gray-200 transition border-b border-gray-300">
                    <div
                      className="max-h-20 overflow-y-auto w-40 scrollbar-hid odd:bg-white even:bg-gray-50 hover:bg-gray-200 transition border-b border-gray-300e"
                      style={{
                        scrollbarWidth: "none", // Firefox
                        msOverflowStyle: "none", // IE/Edge
                      }}
                    >
                      {Array.isArray(data.NoS) && data.NoS.length > 0 ? (
                        data.NoS.map((sensor, idx) => (
                          <div key={idx} className="">
                            {JSON.stringify(sensor)}
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-400">No Sensors</span>
                      )}
                    </div>
                  </td>

                  <td className="odd:bg-white even:bg-gray-50 hover:bg-gray-200 transition border-b border-gray-300">{data.Timestamp}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListTable;
