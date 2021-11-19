import React, { useEffect, useState } from "react";
import Contents from "../navigation/Contents";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import Select from "react-select";

function RegisterEntry() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [members, setMembers] = useState([]);
  const options = [];

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/users/members/`;
    const fetchMembers = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const array = await response.json();
      if (response.ok) {
        setMembers(array.results);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");
      }
    };
    fetchMembers();
  }, [navigate]);

  let vehicleTypes = [
    {
      label: "2-wheeler",
      value: "2-wheeler",
    },
    {
      label: "4-wheeler",
      value: "4-wheeler",
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      propertyNo: "",
      vehicleType: "",
      vehicleNumber: "",
      exited: false,
    },
    onSubmit: (values, { resetForm }) => {
      const url = `${process.env.REACT_APP_BACKEND_HOST}/api/parking_lot/gate_log/`;
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            property_no: values.propertyNo,
            name: values.name,
            vehicle_type: values.vehicleType,
            vehicle_number: values.vehicleNumber,
            exited: values.exited,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        if (response.ok) {
          resetForm({ values: "" });
          navigate("/gatelog");
        } else {
          const values = Object.values(result);
          if (
            values[0] === "Invalid Token" ||
            values[0] === "The Token is expired"
          ) {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.setItem("isLoggedIn", "false");
            navigate("/login");
          }
          setMsg(values[0]);
        }
      };
      fetchData();
    },
  });

  return (
    <div className="h-screen flex">
      <div className="bg-white dark:bg-gray-800 w-48 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll">
          <div className="md:py-5 flex-grow py-3 text-center dark:text-white uppercase tracking-wider font-semibold text-xl md:text-3xl">
            Register Entry
          </div>
          <div className="mx-3 lg:mx-10 border rounded bg-black flex items-center justify-center">
            <div className="bg-white w-full rounded shadow-lg pt-8 pb-4 px-6 md:p-8">
              <div className="grid gap-4 gap-y-2 grid-cols-1 lg:grid-cols-2">
                <div className="lg:col-span-2">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="grid gap-4 gap-y-4 grid-cols-1 md:grid-cols-2">
                      <div className="md:col-span-1">
                        <label htmlFor="name">Name*</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter Name"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          required
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="propertyNo" className="mb-2">
                          Property Number*
                        </label>
                        {members &&
                          members.forEach((element) => {
                            options.push({
                              label: element.property_no,
                              value: element.property_no,
                            });
                          })}
                        <Select
                          options={options}
                          onChange={(element) => {
                            formik.setFieldValue("propertyNo", element.value);
                          }}
                          placeholder="Select Property No."
                          required
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="vehicleType">Vehicle Type</label>
                        <Select
                          options={vehicleTypes}
                          onChange={(element) => {
                            formik.setFieldValue("vehicleType", element.value);
                          }}
                          placeholder="Select Vehicle Type"
                          required
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="vehicleNumber">Vehicle Number</label>
                        <input
                          type="text"
                          name="vehicleNumber"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter Vehicle Number"
                          onChange={formik.handleChange}
                          value={formik.values.vehicleNumber}
                        />
                      </div>
                      <div className="md:col-span-2 text-center md:row-start-4 text-red-500">
                        {msg}
                      </div>
                      <div className="md:col-span-2 text-right md:row-start-5">
                        <div className="inline-flex items-end">
                          <button
                            type="submit"
                            className="bg-green-400 hover:bg-green-600 text-white font-bold my-3 py-2 px-4 rounded"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterEntry;
