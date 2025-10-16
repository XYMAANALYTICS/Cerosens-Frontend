import useReportsStore from "../../store/reportsStore";

const ReportOptions = () => {
  const resetState = useReportsStore((s) => s.resetState);
  const setState = useReportsStore((s) => s.setState);

  const options = [
    { label: "Date-Wise", key: "dateWise" },
    { label: "Count-Wise", key: "countWise" },
    { label: "Average Data", key: "averageData" },
    { label: "Interval Data", key: "intervalData" },
  ];

  // console.log("report option rendered");

  return (
    <div className="h-[10%] w-[100%] flex justify-between gap-4 p-4 rounded-md card-bg heading-txt-color inset-shadow-sm inset-shadow-gray-400 border-[#e5e7eb]">
      {options.map(({ label, key }) => (
        <button
          key={key}
          className="button-style-1"
          onClick={() => {
            setState({ selectedReportType: key });
            resetState();
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ReportOptions;
