import React, { useState, useEffect } from "react";
import TransactionsMobileTable from "./TransactionMobileTable";
import TableCell from "../basicComponents/TableCell";
import TableHeader from "../basicComponents/TableHeader";
import Contents from "../navigation/Contents";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Transaction() {
  const [transaction, setTransaction] = useState([]);

  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values, { resetForm }) => {
      const searchvalues = values.search.split().join("+");

      const url = `${process.env.REACT_APP_BACKEND_HOST}/api/payments/transactions/?search=${searchvalues}`;
      const fetchData = async () => {
        const response = await fetch(url, {
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const array = await response.json();
        resetForm({ values: "" });
        if (response.ok) {
          setTransaction(array.results);
        } else {
          navigate("/logout");
        }
      };
      fetchData();
    },
  });

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/payments/transactions/`;
    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const array = await response.json();
      if (response.ok) {
        setTransaction(array.results);
      } else {
        navigate("/logout");
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div className="h-screen flex">
      <div className="bg-white dark:bg-gray-800 w-48 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll">
          <div className="flex-col hidden sm:flex">
            <div className="overflow-x-auto py-5">
              <div className="flex px-5">
                <div className="invisible flex-grow-0 px-2 py-1 w-auto border rounded bg-blue-100 text-blue-500">
                  + Add Transaction
                </div>
                <div className="flex-grow px-3 text-center dark:text-white uppercase tracking-wider font-semibold text-3xl">
                  Transactions
                </div>
                {localStorage.getItem("group") === "1" ? (
                  <Link to="/transactions/add">
                    <button className="flex-grow-0 px-2 py-1 w-auto border rounded bg-blue-100 text-blue-500">
                      + Add Transaction
                    </button>
                  </Link>
                ) : (
                  <div className="invisible flex-grow-0 px-2 py-1 w-auto border rounded bg-blue-100 text-blue-500">
                    + Add Transaction
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
                        <TableHeader title="Date and Time" />
                        <TableHeader title="Paid/Received" />
                        <TableHeader title="To/From" />
                        <TableHeader title="Amount" />
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transaction &&
                        transaction.map((element) => {
                          return (
                            <tr
                              key={element.s_no}
                              className="divide-x-2 divide-gray-200 even:bg-gray-100"
                            >
                              <TableCell
                                value={new Date(element.date).toLocaleString(
                                  "en-in"
                                )}
                                link={`/transactions/view/${element.s_no}`}
                              />
                              <TableCell value={element.option.toUpperCase()} />
                              <TableCell value={element.to} />
                              <TableCell value={element.amount.toString()} />
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
                <div className="flex-grow px-2 text-center uppercase font-semibold text-xl dark:text-white">
                  Transactions
                </div>
                {localStorage.getItem("group") === "1" ? (
                  <Link to="/transactions/add">
                    <button className="flex-grow-0 px-2 py-1 w-auto border rounded bg-blue-100 text-blue-500">
                      + Add
                    </button>
                  </Link>
                ) : (
                  <div className="invisible flex-grow-0 px-2 py-1 w-auto border rounded bg-blue-100 text-blue-500">
                    + Add
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
              {transaction &&
                transaction.map((element) => {
                  return (
                    <div key={element.s_no}>
                      <TransactionsMobileTable
                        s_no={element.s_no.toString()}
                        date={new Date(element.date).toLocaleString("en-in")}
                        to={element.to}
                        option={element.option}
                        amount={element.amount.toString()}
                      />
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

export default Transaction;
