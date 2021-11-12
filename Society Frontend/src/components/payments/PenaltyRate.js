import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // version 5.2.0

function PenaltyRate() {
  const [penalty, setPenalty] = useState(0);
  let history = useHistory();
  function handleChange(event) {
    setPenalty(event.target.value);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const rawResponse = await fetch(
      "http://localhost:8000/api/payments/penalty/",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "Token 697c3b24ed911595b2158df62b2d5ab2381ae474",
        },
        body: JSON.stringify({ penalty: penalty }),
      }
    );
    const content = await rawResponse.json();
    alert("Penalty set to " + content.penalty + "% per month");
    history.push("/");
  }
  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/payments/penalty/";
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            authorization: "Token 62466cb3721792673088f4ac75187f89e31e1686",
          },
        });
        const array = await response.json();
        setPenalty(array.penalty);
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
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="w-full md:w-1/3 mt-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
              Penalty Rate
            </label>
            <input
              className="appearance-none block h-1 mt-2 w-32 bg-white-200 text-gray-700 border border-gray-200 rounded py-4 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="amount"
              type="number"
              min="1"
              value={penalty}
              required
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

export default PenaltyRate;
