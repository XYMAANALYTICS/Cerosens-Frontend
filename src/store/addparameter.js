import { create } from "zustand";

const paramters = create((set, get) => ({
  addbtnstatus: false,
  addptojectbtnstatus:false,
  addpuserbtnstatus:false,
  setState: ( partial) => set(partial),
  count:1,
  usercount:1,
  CurrentLinechartOption:"TH",
  Pulse_Width:"",
  Amplitude:"",
  Frequency:"",
  Gain:"",
  Filter:"",
  Masps:"",
  Start:"",
  Stop:"",
  Deviceselect :false,
  TrailNamePopup :false,

}));
export default paramters;