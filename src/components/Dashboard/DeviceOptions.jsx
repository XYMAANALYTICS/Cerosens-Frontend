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
      <option value="Thickness">Thickness</option>
      <option value="Battery">Battery</option>
      <option value="Signal">Singnal</option>
      <option value="DeviceTemp">Device Temperature</option>
      <option value="Pressure">Pressure</option>
      <option value="Altitude">Altitude</option>
      <option value="AirQuality">Air Quality</option>
    </select>
  );
};

export default DeviceOptions;
