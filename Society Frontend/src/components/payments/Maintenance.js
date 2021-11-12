import React, { useState, useEffect } from "react";
import MaintenanceMobileTable from "./MaintenanceMobileTable";
import TableCell from "../TableCell";
import TableHeader from "../TableHeader";
import { Link } from "react-router-dom";

function Maintenance() {
  const [maintenance, setMaintenance] = useState([]);
  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/payments/maintenance/";
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            authorization: "Token 62466cb3721792673088f4ac75187f89e31e1686",
          },
        });
        const array = await response.json();
        setMaintenance(array.results);
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
            Maintenance
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
                to="/pay"
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
                Add Payment
              </Link>
            </div>
            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white ">
                  <tr>
                    <TableHeader title="Property" />
                    <TableHeader title="Month" />
                    <TableHeader title="Basic" />
                    <TableHeader title="Paid" />
                    <TableHeader title="Penalty" />
                    <TableHeader title="Due" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {maintenance.map((element) => {
                    return (
                      <tr
                        key={element.property_no + element.month}
                        className="divide-x-2 divide-gray-200 even:bg-gray-100"
                      >
                        <TableCell value={element.property_no} />
                        <TableCell
                          value={new Date(element.month).toLocaleString(
                            "en-in",
                            { year: "numeric", month: "long" }
                          )}
                        />
                        <TableCell value={element.amount_basic.toString()} />
                        <TableCell value={element.amount_paid.toString()} />
                        <TableCell value={element.amount_penalty.toString()} />
                        <TableCell value={element.amount_due.toString()} />
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
            Maintenance
          </div>
          {maintenance.map((element) => {
            return (
              <div key={element.property_no + element.month}>
                <MaintenanceMobileTable
                  property={element.property_no}
                  month={new Date(element.month).toLocaleString("en-in", {
                    year: "numeric",
                    month: "long",
                  })}
                  basic={element.amount_basic.toString()}
                  paid={element.amount_paid.toString()}
                  penalty={element.amount_penalty.toString()}
                  due={element.amount_due.toString()}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
