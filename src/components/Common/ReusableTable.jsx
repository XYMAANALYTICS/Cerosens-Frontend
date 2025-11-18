const ReusableTable = ({ columns, data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-4 text-gray-400 text-sm">
        No Data!
      </div>
    );
  }

  return (
    <div className="overflow-auto rounded-xl shadow-md bg-white p-2  border border-[#bae9bc]"   
    style={{
        maxHeight: "100%",
        scrollbarWidth: "thin",
        scrollbarColor: "#DCDEDD transparent",
      }}>
      <table className="w-full border-collapse text-[8px] md:text-[10px] 2xl:text-[12px]">
        
        {/* ---------- HEADER ---------- */}
        <thead className="sticky top-0 parent-bg text-gray-900 shadow-sm">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="px-3 py-3 text-left font-semibold border-b border-gray-300"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* ---------- BODY ---------- */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-200 transition border-b border-gray-300"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-3 py-2">
                  {col.key === "index" ? rowIndex + 1 : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default ReusableTable;
