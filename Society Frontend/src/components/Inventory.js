import React, { useState, useEffect } from "react";
import InventoryMobileTable from "./InventoryMobileTable";
import TableCell from "./TableCell";
import TableHeader from "./TableHeader";

function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/society_info/inventory/";
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            authorization: "Token 62466cb3721792673088f4ac75187f89e31e1686",
          },
        });
        const array = await response.json();
        setInventory(array.results);
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
          <div className="text-center dark:text-white font-semibold text-3xl">
            Inventory
          </div>
          <div
            className="
              py-3
              align-middle
              inline-block
              min-w-full
              px-5
              sm:px-16
              md:px-28
              lg:px-44
              xl:px-64
              md:py-5
            "
          >
            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white ">
                  <tr>
                    <TableHeader title="Item" />
                    <TableHeader title="Quantity" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventory.map((element) => {
                    return (
                      <tr
                        key={element.item}
                        className="divide-x-2 divide-gray-200 even:bg-gray-100"
                      >
                        <TableCell value={element.item} />
                        <TableCell value={element.quantity.toString()} />
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
          <div className="text-center font-semibold text-xl dark:text-white">
            Inventory
          </div>
          {inventory && inventory.map((element) => {
            return (
              <div key={element.item}>
                <InventoryMobileTable
                  item={element.item}
                  quantity={element.quantity.toString()}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Inventory;
