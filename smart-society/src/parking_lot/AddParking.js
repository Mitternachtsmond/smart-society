import React, { useEffect, useState } from "react";
import Contents from "../navigation/Contents";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import Select from "react-select";

function AddParking() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [members, setMembers] = useState([]);
  const options = [];
  options.push({
    label: "Visitor",
    value: "",
  });
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
        navigate("/logout");
      }
    };
    fetchMembers();
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      parkingId: "",
      propertyNo: "",
    },
    onSubmit: (values, { resetForm }) => {
      const url = `${process.env.REACT_APP_BACKEND_HOST}/api/parking_lot/parking/`;
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            parking_id: values.parkingId,
            property_no: values.propertyNo,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        if (response.ok) {
          resetForm({ values: "" });
          navigate("/parking");
        } else {
          if (
            Object.values(result)[0] === "Invalid Token" ||
            Object.values(result)[0] === "The Token is expired"
          ) {
            navigate("/logout");
          }
          setMsg(Object.values(result)[0]);
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
            Add Parking
          </div>
          <div
            className="
              flex flex-col
              justify-center
              sm:w-2/3  
              md:w-3/4
              lg:w-1/2
              sm:m-auto
              mx-5
              mb-5
              space-y-8
            "
          >
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="ParkingId">Parking Id*</label>
                  <input
                    type="text"
                    name="parkingId"
                    id="parkingId"
                    className="
                    bg-gray-50
                      border-2
                      rounded
                      px-3
                      py-2
                      w-full
                      focus:outline-none focus:border-blue-400 focus:shadow"
                    onChange={formik.handleChange}
                    value={formik.values.parkingId}
                    placeholder="Enter Parking Id"
                    required
                  />
                  <label htmlFor="propertyNo" className="pt-2">
                    Property No.*
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
                      formik.values.propertyNo = element.value;
                    }}
                    placeholder="Select Property"
                  />
                </div>
                <div className="text-red-500 text-center">{msg}</div>
                <div className="flex flex-row-reverse">
                  <button
                    type="submit"
                    className="bg-green-400 hover:bg-green-600 text-white font-bold my-3 py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddParking;
