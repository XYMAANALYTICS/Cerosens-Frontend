import ReportOptions from "../components/Common/ReportOptions";
import ReportSelector from "../components/Common/ReportSelector";

const Reports = () => {
  return (
    <div className="h-[92%] w-[100%] p-1 flex flex-col items-start gap-4 text-gray-200">
        <ReportOptions />
    

      <div className="w-[100%] flex h-[100%] gap-2">
        <div className="w-[30%] rounded-md card-bg heading-txt-color inset-shadow-sm inset-shadow-gray-400 border-[#e5e7eb]"></div>
        <div className="w-[70%] rounded-md card-bg heading-txt-color inset-shadow-sm inset-shadow-gray-400 border-[#e5e7eb]">
          <ReportSelector fromPage={"reports"}/>
        </div>
      </div>
    </div>
  );
};

export default Reports;
