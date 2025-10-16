const ReusableTable = ({ columns, data }) => {
  // console.log("columns=",columns)
  return data.length > 0 ? (
    <table className="w-full overflow-auto rounded-2xl card-bg heading-txt-color inset-shadow-sm inset-shadow-gray-400">
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i} className="t-bdr">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex} className="t-bdr">
                {col.key === "index" ? rowIndex + 1 : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div>No Data!</div>
  );
};

export default ReusableTable;
