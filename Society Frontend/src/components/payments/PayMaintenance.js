import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SelectSearch from "react-select-search";
import { fuzzySearch } from "react-select-search";
import { useHistory } from "react-router-dom"; // version 5.2.0
function PayMaintenance() {
  let history = useHistory();
  let options = [];
  let choices = {
    property_no: "None",
    amount: "0",
  };
  function handleChange(event) {
    choices.amount = event.target.value;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(choices);
    const rawResponse = await fetch("http://localhost:8000/api/payments/pay/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "Token 697c3b24ed911595b2158df62b2d5ab2381ae474",
      },
      body: JSON.stringify(choices),
    });
    const content = await rawResponse.json();
    console.log(content);
    alert(content.status);
    history.push("/maintenance");
  }
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const url = "http://localhost:8000/api/users/members";
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            authorization: "Token 62466cb3721792673088f4ac75187f89e31e1686",
          },
        });
        const array = await response.json();
        setMembers(array.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="pt-20 pb-5">
      <div
        className="
          flex flex-col
          justify-center
          sm:w-96 sm:m-auto
          mx-5
          mb-5
          space-y-8
        "
      >
        <div className="text-center dark:text-white uppercase tracking-wider font-semibold text-3xl">
          Pay Maintenance
        </div>
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6"></div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Property Number
              </label>
              {members.forEach((element) => {
                options.push({
                  name: element.property_no,
                  value: element.property_no,
                });
              })}
              <SelectSearch
                options={options}
                name="property"
                placeholder="Choose a property"
                search="true"
                id="property"
                onChange={(value) => {
                  choices.property_no = value;
                }}
                emptyMessage={() => (
                  <div style={{ textAlign: "center", fontSize: "0.8em" }}>
                    Not found
                  </div>
                )}
                filterOptions={fuzzySearch}
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 mt-2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
              for="grid-zip"
            >
              Amount
            </label>
            <input
              className="appearance-none block h-1 mt-2 w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-4 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="amount"
              type="number"
              onChange={handleChange}
            />
            <input
              type="submit"
              value="submit"
              className="
                mt-4
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
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default PayMaintenance;
