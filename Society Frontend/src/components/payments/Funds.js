import React, { useState, useEffect } from "react";

function Funds() {
  const [funds, setFunds] = useState(0);

  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/payments/funds/";
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            authorization: "Token 62466cb3721792673088f4ac75187f89e31e1686",
          },
        });
        const array = await response.json();
        setFunds(array.funds);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex-col hidden sm:flex">
      <div className="overflow-x-auto py-5">
        <div className="text-center dark:text-white font-semibold text-2xl">
          Funds: {funds}
        </div>
      </div>
    </div>
  );
}

export default Funds;
