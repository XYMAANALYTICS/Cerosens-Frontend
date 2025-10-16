import paramters from "../../store/addparameter";

const DeviceOptions = () => {
  const setState = paramters((s) => s.setState);
  const CurrentLinechartOption = paramters((s) => s.CurrentLinechartOption);

  return (
    <select
      value={CurrentLinechartOption}
      onChange={(e) => setState({ CurrentLinechartOption: e.target.value })}
      className="border px-3 py-1 rounded-md text-sm bg-white shadow-md outline-none focus:ring focus:ring-blue-400"
    >
      <option value="TH">Thickness</option>
      <option value="BS">Battery</option>
      <option value="SS">Singnal</option>
      <option value="BT">Device Temperature</option>
      <option value="P">Pressure</option>
      <option value="A">Altitude</option>
      <option value="AQ">Air Quality</option>
    </select>
  );
};

export default DeviceOptions;
