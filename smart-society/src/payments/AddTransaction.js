import React, { useState } from "react";
import Contents from "../navigation/Contents";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import Select from "react-select";

function AddTransaction() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const options = [
    {
      label: "Paid",
      value: "paid",
    },
    {
      label: "Received",
      value: "received",
    },
  ];
  const formik = useFormik({
    initialValues: {
      option: "",
      amount: "",
      description: "",
      to: "",
      date: "",
    },
    onSubmit: (values, { resetForm }) => {
      const url = `${process.env.REACT_APP_BACKEND_HOST}/api/payments/transactions/`;
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            option: values.option,
            amount: values.amount,
            description: values.description
              ? values.description
              : JSON.parse(null),
            to: values.to,
            date: values.date,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        if (response.ok) {
          resetForm({ values: "" });
          navigate("/transactions");
        } else {
          const values = Object.values(result);
          if (
            values[0] === "Invalid Token" ||
            values[0] === "The Token is expired"
          ) {
            navigate("/logout");
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
            Add Transaction
          </div>
          <div className="mx-3 lg:mx-10 border rounded bg-black flex items-center justify-center">
            <div className="bg-white w-full rounded shadow-lg pt-8 pb-4 px-6 md:p-8">
              <div className="grid gap-4 gap-y-2 grid-cols-1 lg:grid-cols-2">
                <div className="lg:col-span-2">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="grid gap-4 gap-y-4 grid-cols-1 md:grid-cols-2">
                      <div className="md:col-span-1">
                        <label htmlFor="option">Option*</label>
                        <Select
                          options={options}
                          onChange={(element) => {
                            formik.values.option = element.value;
                          }}
                          placeholder="Select Option"
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="amount">Amount*</label>
                        <input
                          type="number"
                          name="amount"
                          id="amount"
                          placeholder="Enter Amount"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          onChange={formik.handleChange}
                          value={formik.values.amount}
                          required
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="to">To/From*</label>
                        <input
                          type="text"
                          name="to"
                          id="to"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter Name of Sender/Receiver"
                          onChange={formik.handleChange}
                          value={formik.values.to}
                          required
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="date">Date and Time*</label>
                        <input
                          type="datetime-local"
                          name="date"
                          id="date"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          onChange={formik.handleChange}
                          value={formik.values.date}
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="description">Description</label>
                        <textarea
                          name="description"
                          id="description"
                          rows="5"
                          className="bg-gray-50 mt-1 w-full border rounded form-textarea px-4 py-2"
                          placeholder="Enter Description"
                          onChange={formik.handleChange}
                          value={formik.values.description}
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

export default AddTransaction;
