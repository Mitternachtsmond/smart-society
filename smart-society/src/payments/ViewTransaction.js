import React, { useState, useEffect } from "react";
import Contents from "../navigation/Contents";
import { useNavigate, useParams } from "react-router";

function ViewTransaction() {
  const { sno } = useParams();
  const navigate = useNavigate();
  const [option, setOption] = useState("");
  const [amount, setAmount] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    const url = `http://127.0.0.1:8000/api/payments/transactions/${sno}/`;
    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setOption(result.option);
        setAmount(result.amount);
        setTo(result.to);
        setDate(result.date);
        setDescription(result.description);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate, sno]);

  return (
    <div className="h-screen flex">
      <div className="bg-green-300 dark:bg-gray-800 w-64 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll">
          <div className="md:py-5 flex-grow py-3 text-center dark:text-white uppercase tracking-wider font-semibold text-xl md:text-3xl">
            View Transaction
          </div>
          <div className="mx-3 lg:mx-10 border rounded bg-black flex items-center justify-center">
            <div className="bg-white w-full rounded shadow-lg pt-8 pb-4 px-6 md:p-8">
              <div className="grid gap-4 gap-y-2 grid-cols-1 lg:grid-cols-2">
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-4 grid-cols-1 md:grid-cols-2">
                    <div className="md:col-span-1">
                      <label htmlFor="option">Option*</label>
                      <input
                        name="option"
                        id="option"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={option.toUpperCase()}
                        readonly
                      >
                      </input>
                    </div>

                    <div className="md:col-span-1">
                      <label htmlFor="amount">Amount*</label>
                      <input
                        type="text"
                        name="amount"
                        id="amount"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={amount}
                        readonly
                      />
                    </div>

                    <div className="md:col-span-1">
                      <label htmlFor="to">To/From*</label>
                      <input
                        type="text"
                        name="to"
                        id="to"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={to}
                      />
                    </div>

                    <div className="md:col-span-1">
                      <label htmlFor="date">Date and Time*</label>
                      <input
                        type="text"
                        name="date"
                        id="date"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={new Date(date).toLocaleString("en-in")}
                        readonly
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="description">Description</label>
                      <textarea
                        name="description"
                        id="description"
                        rows="7"
                        className="bg-gray-50 mt-1 w-full border rounded form-textarea px-4 py-2"
                        value={description}
                        readonly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTransaction;
