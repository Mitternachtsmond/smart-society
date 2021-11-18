import React, { useState, useEffect } from "react";
import TableCell from "../basicComponents/TableCell";
import TableHeader from "../basicComponents/TableHeader";
import Contents from "../navigation/Contents";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import moment from "moment";
import TableMobileCell from "../basicComponents/TableMobileCell";
import TableMobileHeader from "../basicComponents/TableMobileHeader";
import { Link } from "react-router-dom";

function GateLog() {
  const [gateLogs, setGateLogs] = useState([]);
  const [value, setValue] = useState(0);

  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values, { resetForm }) => {
      const searchvalues = values.search.split().join("+");

      const url = `http://127.0.0.1:8000/api/parking_lot/gate_log/?search=${searchvalues}`;
      const fetchData = async () => {
        const response = await fetch(url, {
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const array = await response.json();
        resetForm({ values: "" });
        if (response.ok) {
          setGateLogs(array.results);
        } else {
          navigate("/logout");
        }
      };
      fetchData();
    },
  });

  function handleExit(element) {
    let updates = {
      s_no: element.target.value,
      name: element.target.name,
      exited: true,
      property_no: element.target.id,
    };
    const url = `http://127.0.0.1:8000/api/parking_lot/gate_log/${updates.s_no}/`;
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
        setValue(value + 1);
        navigate("/gatelog");
      } else {
        navigate("/logout");
      }
    };
    putExit();
  }

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    const url = "http://127.0.0.1:8000/api/parking_lot/gate_log/";
    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const array = await response.json();
      if (response.ok) {
        setGateLogs(array.results);
      } else {
        navigate("/logout");
      }
    };
    fetchData();
  }, [navigate, value]);

  return (
    <div className="h-screen flex">
      <div className="bg-green-300 dark:bg-gray-800 w-64 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll">
          <div className="flex-col hidden sm:flex">
            <div className="overflow-x-auto py-5">
              <div className="flex px-5">
                <div className="invisible flex-grow-0 px-2 py-1 w-auto border rounded bg-blue-100 text-blue-500">
                  + Register Entry
                </div>
                <div className="flex-grow text-center dark:text-white uppercase tracking-wider font-semibold text-3xl">
                  Gate Logs
                </div>
                {localStorage.getItem("group") === "3" ? (
                  <Link to="/gatelog/register">
                    <button className="flex-grow-0 px-2 py-1 w-auto border rounded bg-blue-100 text-blue-500">
                      + Register Entry
                    </button>
                  </Link>
                ) : (
                  <div className="invisible flex-grow-0 px-2 py-1 w-auto border rounded bg-blue-100 text-blue-500">
                    + Register Entry
                  </div>
                )}
              </div>
              <form
                className="border rounded flex my-3 mx-5"
                onSubmit={formik.handleSubmit}
              >
                <input
                  type="text"
                  className="w-full px-4 py-2"
                  placeholder="Search..."
                  name="search"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.search}
                />
                <button type="submit" className="px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black dark:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>
              <div
                className="
              py-3
              align-middle
              inline-block
              min-w-full
              px-5
              md:py-5
            "
              >
                <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white ">
                      <tr>
                        <TableHeader title="Name" />
                        <TableHeader title="Property No." />
                        <TableHeader title="Parking" />
                        <TableHeader title="Entry Time" />
                        <TableHeader title="Exit Time" />
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {gateLogs.map((element) => {
                        return (
                          <tr
                            key={element.s_no}
                            className="divide-x-2 divide-gray-200 even:bg-gray-100"
                          >
                            <TableCell
                              value={element.name}
                              link={`/gatelog/view/${element.s_no}`}
                            />
                            <TableCell value={element.property_no} />
                            {element.parking_id === null ? (
                              element.vehicle_type === null ? (
                                <TableCell value="-" />
                              ) : (
                                <TableCell value="Two Wheeler Space" />
                              )
                            ) : (
                              <TableCell value={element.parking_id} />
                            )}
                            <TableCell
                              value={moment(element.entry_time).format("LLL")}
                            />
                            {element.exit_time == null ? (
                              localStorage.getItem("group") === "1" ? (
                                <TableCell value="Pending Exit" />
                              ) : (
                                <td>
                                  <div className="text-center">
                                    <button
                                      value={element.s_no}
                                      name={element.name}
                                      id={element.property_no}
                                      onClick={handleExit}
                                      className="bg-red-500 hover:bg-red-700 text-white font-bold my-3 py-2 px-6 rounded"
                                    >
                                      Exit
                                    </button>
                                  </div>
                                </td>
                              )
                            ) : (
                              <TableCell
                                value={moment(element.exit_time).format("LLL")}
                              />
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col flex sm:hidden">
            <div className="overflow-x-auto py-5">
              <div className="flex px-5">
                <div className="invisible flex-grow-0 px-2 py-1 w-auto border rounded bg-blue-100 text-blue-500">
                  + Add
                </div>
                <div className="flex-grow text-center uppercase font-semibold text-xl dark:text-white">
                  Gate Logs
                </div>
                <div className="flex-grow-0 px-2 py-1 w-auto border rounded bg-blue-100 text-blue-500">
                  <Link to="/gatelog/register">+ Add</Link>
                </div>
              </div>
              <form
                className="border rounded flex my-3 mx-5"
                onSubmit={formik.handleSubmit}
              >
                <input
                  type="text"
                  className="w-full px-4 py-2"
                  placeholder="Search..."
                  name="search"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.search}
                />
                <button type="submit" className="px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black dark:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>

              {gateLogs &&
                gateLogs.map((element) => {
                  return (
                    <div key={element.s_no}>
                      <div className="py-3 align-middle inline-block min-w-full px-5">
                        <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
                          <table className="min-w-full">
                            <tbody className="bg-white ">
                              <tr className="even:bg-gray-100">
                                <TableMobileHeader value="Name" />
                                <TableMobileCell
                                  value={element.name}
                                  link={`/gatelog/view/${element.s_no}`}
                                />
                              </tr>
                              <tr className="even:bg-gray-100">
                                <TableMobileHeader value="Property No." />
                                <TableMobileCell value={element.property_no} />
                              </tr>
                              <tr className="even:bg-gray-100">
                                <TableMobileHeader value="Parking" />
                                {element.parking_id === null ? (
                                  element.vehicle_type === null ? (
                                    <TableMobileCell value="-" />
                                  ) : (
                                    <TableMobileCell value="Two Wheeler Space" />
                                  )
                                ) : (
                                  <TableMobileCell value={element.parking_id} />
                                )}
                              </tr>
                              <tr className="even:bg-gray-100">
                                <TableMobileHeader value="Entry Time" />
                                <TableMobileCell
                                  value={moment(element.entry_time).format(
                                    "LLL"
                                  )}
                                />
                              </tr>
                              <tr className="even:bg-gray-100">
                                <TableMobileHeader value="Exit Time" />
                                {element.exit_time === null ? (
                                  localStorage.getItem("group") === "1" ? (
                                    <TableMobileCell value="Pending Exit" />
                                  ) : (
                                    <td>
                                      <div className="px-4 text-right">
                                        <button
                                          value={element.s_no}
                                          name={element.name}
                                          id={element.property_no}
                                          onClick={handleExit}
                                          className="bg-red-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-6 rounded"
                                        >
                                          Exit
                                        </button>
                                      </div>
                                    </td>
                                  )
                                ) : (
                                  <TableMobileCell
                                    value={moment(element.exit_time).format(
                                      "LLL"
                                    )}
                                  />
                                )}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GateLog;
