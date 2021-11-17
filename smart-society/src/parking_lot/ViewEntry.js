import React, { useEffect, useState } from "react";
import Contents from "../navigation/Contents";
import { useNavigate, useParams } from "react-router";
import moment from "moment";

function ViewEntry() {
  const { sNo } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [propertyNo, setPropertyNo] = useState("");
  const [entryTime, setEntryTime] = useState("");
  const [exitTime, setExitTime] = useState("");
  const [parkingId, setParkingId] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    const url = `http://127.0.0.1:8000/api/parking_lot/gate_log/${sNo}`;
    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setName(result.name);
        setPropertyNo(result.property_no);
        setParkingId(result.parking_id === null ? "" : result.parking_id);
        setVehicleNumber(
          result.vehicle_number === null ? "" : result.vehicle_number
        );
        setVehicleType(result.vehicle_type === null ? "" : result.vehicle_type);
        setEntryTime(result.entry_time);
        setExitTime(result.exit_time);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");
      }
    };
    fetchData();
  });

  function handleExit(element) {
    let updates = {
      s_no: sNo,
      name: name,
      exited: true,
      property_no: propertyNo,
    };
    const url = `http://127.0.0.1:8000/api/parking_lot/gate_log/${sNo}/`;
    const putExit = async () => {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updates),
      });
      if (response.ok) {
        navigate("/gatelog");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");
      }
    };
    putExit();
  }

  return (
    <div className="h-screen flex">
      <div className="bg-green-300 dark:bg-gray-800 w-64 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll">
          <div className="md:py-5 flex-grow py-3 text-center dark:text-white uppercase tracking-wider font-semibold text-xl md:text-3xl">
            View Entry
          </div>
          <div className="mx-3 lg:mx-10 border rounded bg-black flex items-center justify-center">
            <div className="bg-white w-full rounded shadow-lg pt-8 pb-4 px-6 md:p-8">
              <div className="grid gap-4 gap-y-2 grid-cols-1 lg:grid-cols-2">
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-4 grid-cols-1 md:grid-cols-2">
                    <div className="md:col-span-1">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={name}
                        readOnly
                        disabled
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label htmlFor="propertyNo" className="mb-2">
                        Property Number*
                      </label>
                      <input
                        type="text"
                        name="propertyNo"
                        id="propertyNo"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={propertyNo}
                        readOnly
                        disabled
                      />
                    </div>

                    <div className="md:col-span-1">
                      <label htmlFor="vehicleType">Vehicle Type</label>
                      <input
                        type="text"
                        name="vehicleType"
                        id="vehicleType"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={vehicleType}
                        readOnly
                        disabled
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label htmlFor="vehicleNumber">Vehicle Number</label>
                      <input
                        type="text"
                        name="vehicleNumber"
                        id="vehicleNumber"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={vehicleNumber}
                        readOnly
                        disabled
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label htmlFor="parkingId">Parking Id</label>
                      <input
                        type="text"
                        name="parkingId"
                        id="parkingId"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={parkingId}
                        readOnly
                        disabled
                      />
                    </div>
                    <div className="md:col-span-1 md:row-start-4">
                      <label htmlFor="entryTime">Entry Time</label>
                      <input
                        type="text"
                        name="entryTime"
                        id="entryTime"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={moment(entryTime).format("LLL")}
                        readOnly
                        disabled
                      />
                    </div>
                    <div className="md:col-span-1 md:row-start-4">
                      {exitTime === null ? (
                        <div className="text-right">
                          <button
                            onClick={handleExit}
                            className="bg-red-500 hover:bg-red-700 text-white mt-7 font-bold py-2 px-6 rounded"
                          >
                            Exit
                          </button>
                        </div>
                      ) : (
                        <>
                          <label htmlFor="exitTime">Exit Time</label>
                          <input
                            type="text"
                            name="exitTime"
                            id="exitTime"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={moment(exitTime).format("LLL")}
                            readOnly
                            disabled
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEntry;
