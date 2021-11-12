import SelectSearch from "react-select-search";
import { fuzzySearch } from "react-select-search";
import { useHistory } from "react-router-dom"; // version 5.2.0
function AddTransaction() {
  let history = useHistory();
  let options = [
    { name: "Paid", value: "paid" },
    { name: "Received", value: "received" },
  ];
  let choices = {
    option: "",
    amount: "",
    description: "",
    to: "",
    date: "",
  };
  function handleChange(event) {
    const target = event.target;
    if (target.id === "amount") {
      choices.amount = target.value;
    } else if (target.id === "toFrom") {
      choices.to = target.value;
    } else if (target.id === "dateTime") {
      choices.date = target.value;
    } else {
      choices.description = target.value;
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(choices);
    const rawResponse = await fetch(
      "http://localhost:8000/api/payments/transactions/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Token 697c3b24ed911595b2158df62b2d5ab2381ae474",
        },
        body: JSON.stringify(choices),
      }
    );
    alert("Transaction saved successfully");
    history.push("/transactions");
  }
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
        <form className="w-full max-w-lg" onSubmit={handleSubmit} id="form">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Option
              </label>
              <SelectSearch
                options={options}
                placeholder="Choose an option"
                search
                id="option"
                onChange={(value) => {
                  choices.option = value;
                }}
                emptyMessage={() => (
                  <div style={{ textAlign: "center", fontSize: "0.8em" }}>
                    Not Found
                  </div>
                )}
                filterOptions={fuzzySearch}
              />
            </div>
          </div>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
            Amount
          </label>
          <input
            className="appearance-none block h-1 w-60 bg-white-200 text-gray-700 border border-gray-200 rounded py-4 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="amount"
            type="number"
            min="1"
            required
            onChange={handleChange}
          />
          <label className="mt-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
            To/From
          </label>
          <input
            className="mt-2 appearance-none block h-1 w-60 bg-white-200 text-gray-700 border border-gray-200 rounded py-4 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="toFrom"
            type="text"
            required
            onChange={handleChange}
          />
          <label className="mt-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
            Date and Time
          </label>
          <input
            className="mt-2 appearance-none block h-1 w-60 bg-white-200 text-gray-700 border border-gray-200 rounded py-4 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="dateTime"
            type="datetime-local"
            required
            onChange={handleChange}
          />
          <label className="mt-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
            Description
          </label>
          <textarea
            className="mt-2 appearance-none block mt-2 w-60 bg-white-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 form-textarea py-2 px-3"
            rows="3"
            placeholder="Enter a description"
            id="description"
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
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;
