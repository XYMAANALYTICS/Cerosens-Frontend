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
      <div className="w-[30%] flex items-center justify-center card-bg   rounded-md heading-txt-color inset-shadow-sm inset-shadow-gray-400 ">
        <PieChart
          series={[
            { innerRadius: 50, outerRadius: 100, data, arcLabel: "value" },
          ]}
          {...settings}
        />
      </div>
      <div className="w-[70%] card-bg p-1 rounded-md heading-txt-color inset-shadow-sm inset-shadow-gray-400 ">
        <table className="overflow-auto w-full text-white rounded-md ">
          <thead className="text-white btn-bg">
            <tr>
              <th className="t-bdr">S.No</th>
              <th className="t-bdr">ProjectName</th>
              <th className="t-bdr">Username</th>
              <th className="t-bdr">Role</th>
              <th className="t-bdr">UserID</th>
              <th className="t-bdr">Sensors</th>
              <th className="t-bdr">Timestamp</th>
            </tr>
          </thead>
          <tbody className="txt-color text-[10px]">
            {gettabledatas &&
              gettabledatas.map((data, i) => (
                <tr key={i}>
                  <td className="t-bdr">{i + 1}</td>
                  <td className="t-bdr">{data.ProjectName}</td>
                  <td className="t-bdr">{data.Username}</td>
                  <td className="t-bdr">{data.Role}</td>
                  <td className="t-bdr">{data.UserID}</td>
                  <td className="t-bdr">
                    <div
                      className="max-h-20 overflow-y-auto w-40 scrollbar-hide"
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

                  <td className="t-bdr">{data.Timestamp}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListTable;
