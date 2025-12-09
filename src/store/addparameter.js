import { create } from "zustand";

const paramters = create((set, get) => ({
  addbtnstatus: false,
  addptojectbtnstatus:false,
  addpuserbtnstatus:false,
  count:1,
  usercount:1,
  CurrentLinechartOption:"Thickness",
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
  Ascan_Status: null,
  Tofplot_Status:false,
  setState: ( partial) => set(partial),
  
}));
export default paramters;