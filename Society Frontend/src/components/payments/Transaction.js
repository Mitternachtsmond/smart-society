import React, { useState, useEffect } from "react";
import TransactionsMobileTable from "./TransactionsMobileTable";
import TableCell from "../TableCell";
import TableHeader from "../TableHeader";
import { Link } from "react-router-dom";

function Transactions() {
  const [Transactions, setTransactions] = useState([]);
  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/payments/transactions/";
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            authorization: "Token 62466cb3721792673088f4ac75187f89e31e1686",
          },
        });
        const array = await response.json();
        setTransactions(array.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex-col hidden sm:flex">
        <div className="overflow-x-auto py-5">
          <div className="text-center dark:text-white uppercase tracking-wider font-semibold text-3xl">
            Transactions
          </div>
          <div
            className="
              py-3
              align-middle
              inline-block
              min-w-full
              px-5
              sm:px-16
              md:px-20
              lg:px-44
              xl:px-64
              md:py-5
            "
          >
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/addTransaction"
                className="
                mb-4
                py-2
                px-2
                font-medium
                text-white
                dark:text-gray-900
                bg-green-500
                rounded
                hover:bg-green-400
                transition
                duration-300
              "
              >
                Add Transaction
              </Link>
            </div>
            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white ">
                  <tr>
                    <TableHeader title="To/From" />
                    <TableHeader title="Date and Time" />
                    <TableHeader title="Paid/Received" />
                    <TableHeader title="Amount" />
                    <TableHeader title="Description" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Transactions.map((element) => {
                    return (
                      <tr
                        key={element.s_no}
                        className="divide-x-2 divide-gray-200 even:bg-gray-100"
                      >
                        <TableCell value={element.to} />
                        <TableCell
                          value={new Date(element.date).toLocaleString("en-in")}
                        />
                        <TableCell value={element.option} />
                        <TableCell value={element.amount.toString()} />
                        <TableCell
                          value={
                            element.description
                              ? element.description
                                  .split("\n")
                                  .map((i, index) => {
                                    return <p key={index}>{i}</p>;
                                  })
                              : "None"
                          }
                        />
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
          <div className="text-center uppercase font-semibold text-xl dark:text-white">
            Transactions
          </div>
          {Transactions.map((element) => {
            return (
              <div key={element.s_no}>
                <TransactionsMobileTable
                  to={element.to}
                  date={new Date(element.date).toLocaleString("en-in")}
                  option={element.option}
                  amount={element.amount.toString()}
                  description={
                    element.description
                      ? element.description.split("\n").map((i, index) => {
                          return <p key={index}>{i}</p>;
                        })
                      : "None"
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
