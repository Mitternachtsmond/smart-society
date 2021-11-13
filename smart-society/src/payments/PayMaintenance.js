import React, { useEffect, useState } from "react";
import Contents from "../navigation/Contents";
import Select from "react-select";
import { useNavigate } from "react-router";
import { useFormik } from "formik";

function PayMaintenance() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [members, setMembers] = useState([]);
  const options = [];
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    let url = "http://127.0.0.1:8000/api/users/members/";
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

  const formik = useFormik({
    initialValues: {
      propertyNo: "",
      amount: "",
    },
    onSubmit: (values, { resetForm }) => {
      const url = `http://127.0.0.1:8000/api/payments/maintenance/`;
      console.log(values);
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify({
            property_no: values.propertyNo,
            amount: values.amount,
          }),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        if (response.ok) {
          resetForm({ values: "" });
          navigate("/maintenance");
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
      <div className="bg-green-300 dark:bg-gray-800 w-64 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll">
          <div className="md:py-5 flex-grow py-3 text-center dark:text-white uppercase tracking-wider font-semibold text-xl md:text-3xl">
            Add Payment
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
                  <label htmlFor="property_no">Property Number*</label>
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
                  <label htmlFor="amount" className="pt-4">
                    Amount*
                  </label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="Enter Amount"
                    className="
                    bg-gray-50
                      border-2
                      rounded
                      px-3
                      py-2
                      w-full
                      focus:outline-none focus:border-blue-400 focus:shadow"
                    onChange={formik.handleChange}
                    value={formik.values.amount}
                    required
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

export default PayMaintenance;
