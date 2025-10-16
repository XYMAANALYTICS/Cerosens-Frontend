import React, { useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { FaProjectDiagram } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import paramters from "../../../store/addparameter";
import AddprojectPopup from "./AddprojectPopup";
import AdduserPopup from "./AdduserPopup";
import useDataStore from "../../../store/dataStore";

const Adduser = () => {
  const add = paramters((s) => s.addbtnstatus);
  const setState = paramters((s) => s.setState);
  const addptojectbtnstatus = paramters((s) => s.addptojectbtnstatus);
  const addpuserbtnstatus = paramters((s) => s.addpuserbtnstatus);
  // console.log("add btn page is reloading")

  return (
    <div className="h-[100%] border-white flex justify-end relative">
      {/* Button */}
      <div
        className="flex items-center justify-end gap-2  px-4 rounded-2xl cursor-pointer card-bg hover:bg-gray-100 heading-txt-color inset-shadow-sm inset-shadow-gray-400"
        onClick={() => setState({ addbtnstatus: true })}
      >
        <IoPersonAdd />
        <button className="">Add</button>
      </div>

      {/* Modal */}
      {add && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Blur */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

          {/* Centered Content */}
          <div className="relative z-10 bg-black/20  text-white rounded-xl shadow-xl p-8 w-[30%] h-[30%] flex items-center justify-center">
            <div className="flex gap-5">
              <button
                className="text-black  bg-white p-5 rounded-xl hover-effect hover:bg-[#947CEF] hover:text-white"
                onClick={() =>
                  setState({ addbtnstatus: false, addptojectbtnstatus: true })
                }
              >
                <span className="flex items-center justify-center text-3xl ">
                  <FaProjectDiagram className=""/>
                </span>
                Add Project
              </button>
              <button
                className="text-black bg-white p-5 rounded-xl hover-effect hover:bg-[#947CEF] hover:text-white"
                onClick={() =>
                  setState({ addbtnstatus: false, addpuserbtnstatus: true })
                }
              >
                <span className="flex items-center justify-center text-3xl ">
                  <IoIosPersonAdd />
                </span>
                Add User
              </button>
            </div>

            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-white bg-red-400 px-3 py-1 rounded"
              onClick={() => setState({ addbtnstatus: false })}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {addptojectbtnstatus && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Blur */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          {/* Centered Content */}
          <div className="relative z-10 bg-black/20  text-white rounded-xl shadow-xl p-4 w-[50%] h-[75%] flex items-center justify-center">
            {/* Close button */}
            <AddprojectPopup />
            <button
              className="absolute top-2 right-2 text-white bg-red-400 px-3 py-1 rounded"
              onClick={() => setState({ addptojectbtnstatus: false })}
            >
              ✕
            </button>
          </div>
        </div>
      )}
      {addpuserbtnstatus && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Blur */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

          {/* Centered Content */}
          <div className="relative z-10 bg-black/20  text-white rounded-xl shadow-xl p-4 w-[40%] h-[85%] flex items-center justify-center">
            {/* Close button */}
            <AdduserPopup />
            <button
              className="absolute top-2 right-2 text-white bg-red-400 px-3 py-1 rounded"
              onClick={() => setState({ addpuserbtnstatus: false })}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adduser;
