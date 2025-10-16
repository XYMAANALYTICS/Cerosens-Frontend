import useProtectedRouteStore from "../../store/protectedRouteStore";
import useReportsStore from "../../store/reportsStore";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

const ReportSelector = ({ fromPage }) => {
  const userEmail = useProtectedRouteStore((s) => s.userEmail);
  const userName = useProtectedRouteStore((s) => s.userName);

  const getReports = useReportsStore((s) => s.getReports);
  const selectedReportType = useReportsStore((s) => s.selectedReportType);
  const setState = useReportsStore((s) => s.setState);
  const fromDate = useReportsStore((s) => s.fromDate);
  const toDate = useReportsStore((s) => s.toDate);
  const count = useReportsStore((s) => s.count);
  const groupBy = useReportsStore((s) => s.groupBy);

  // count options mapping
  const countOptions = [
    { label: "Last 100 data", value: 100 },
    { label: "Last 250 data", value: 250 },
    { label: "Last 500 data", value: 500 },
    { label: "Last 1000 data", value: 1000 },
  ];

  // date range map
  const dateRangeOptions = [
    { label: "From:", value: fromDate, key: "fromDate" },
    { label: "To:", value: toDate, key: "toDate" },
  ];

  // avergae interval optons
  const groupByOptions = [
    { label: "Hour", value: "hour" },
    { label: "Day", value: "day" },
  ];

  const handleSubmit = async () => {
    const data = await getReports(userEmail, userName, fromPage === "reports");

    if (data && data.length > 0) {
      if (fromPage === "reports") {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        const excelBuffer = XLSX.write(wb, {
          bookType: "xlsx",
          type: "array",
        });
        const info = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(info, `Project_Report.xlsx`);
      } else {
        setState({ analyticsData: data });
      }
    } else {
      toast.error("No data found for the selected range!");
    }
  };

  // console.log("report selector rendered");

  return (
    <form
      className="h-[50%] w-[100%] p-4 flex flex-col gap-4 rounded-md card-bg heading-txt-color inset-shadow-sm inset-shadow-gray-400 border-[#e5e7eb]"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {selectedReportType === "dateWise" ||
      selectedReportType === "averageData" ||
      selectedReportType === "intervalData" ? (
        <>
          <div className="text-center font-medium">Select Date Range</div>
          {dateRangeOptions.map(({ label, value, key }) => (
            <div key={key} className="flex gap-4 items-center">
              <label className="w-1/3">{label}</label>
              <input
                type="date"
                required
                className="in-field 2/3"
                value={value}
                onChange={(e) => setState({ [key]: e.target.value })}
              />
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="text-center font-medium">Select Count</div>
          <div className="grid grid-cols-2 gap-4">
            {countOptions.map(({ label, value }) => (
              <label
                className="flex items-center gap-1 hover-effect"
                key={label}
              >
                <input
                  type="radio"
                  required
                  name="countOpt"
                  value={value}
                  checked={count === value}
                  onChange={(e) => setState({ count: Number(e.target.value) })}
                />
                <div>{label}</div>
              </label>
            ))}
          </div>
        </>
      )}

      {/* hour/day option for average/interval */}
      <div className="flex items-center gap-4">
        {selectedReportType === "averageData" ? (
          <div>Average by -</div>
        ) : selectedReportType === "intervalData" ? (
          <div>Get 1 data per-</div>
        ) : null}

        {(selectedReportType === "averageData" ||
          selectedReportType === "intervalData") &&
          groupByOptions.map(({ label, value }) => (
            <label className="flex items-center gap-1 hover-effect" key={value}>
              <input
                type="radio"
                required
                name="groupByRadio"
                value={value}
                checked={groupBy === value}
                onChange={(e) => setState({ groupBy: e.target.value })}
              />
              <div>{label}</div>
            </label>
          ))}
      </div>

      <button type="submit" className="button-style-1">
        {fromPage === "reports" ? "Download Excel" : "Plot Graph"}
      </button>
    </form>
  );
};

export default ReportSelector;
