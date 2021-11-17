import React, { useEffect, useState } from "react";
import Contents from "../navigation/Contents";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";

function UpdateInventory() {
  const { item } = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [count, setCount] = useState(0);

  const deleteRecord = () => {
    if (count === 0) {
      setCount(1);
      setMsg("Are you sure you want to delete this record permanently?");
    } else {
      const url = `http://127.0.0.1:8000/api/society_info/inventory/${item}/`;
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          navigate("/inventory");
        } else {
          navigate("/logout");
        }
      };
      fetchData();
    }
  };
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    const url = `http://127.0.0.1:8000/api/society_info/inventory/${item}/`;
    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setQuantity(result.quantity);
      } else {
        navigate("/logout");
      }
    };
    fetchData();
  }, [navigate, item]);

  const formik = useFormik({
    initialValues: {
      item: `${item}`,
      quantity: `${quantity}`,
    },
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      const url = `http://127.0.0.1:8000/api/society_info/inventory/${item}/`;
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify({
            item: values.item,
            quantity: values.quantity,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        if (response.ok) {
          resetForm({ values: "" });
          navigate("/inventory");
        } else {
          if (
            Object.values(result)[0] === "Invalid Token" ||
            Object.values(result)[0] === "The Token is expired"
          ) {
            navigate("/logout");
          }
          setMsg(Object.values(result)[0]);
        }
      };
      fetchData();
    },
  });

  return (
    <div className="h-screen flex">
      <div className="bg-green-300 dark:bg-gray-800 w-64 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll">
          <div className="md:py-5 flex-grow py-3 text-center dark:text-white uppercase tracking-wider font-semibold text-xl md:text-3xl">
            Update Item
          </div>
          <div
            className="
              flex flex-col
              justify-center
              sm:w-2/3  
              md:w-3/4
              lg:w-1/2
              sm:m-auto
              mx-5
              mb-5
              space-y-8
            "
          >
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="item">Item*</label>
                  <input
                    type="text"
                    name="item"
                    id="item"
                    className="
                    bg-gray-50
                      border-2
                      rounded
                      px-3
                      py-2
                      w-full
                      focus:outline-none focus:border-blue-400 focus:shadow"
                    onChange={formik.handleChange}
                    value={formik.values.item}
                    placeholder="Enter Item"
                    required
                  />
                  <label htmlFor="quantity" className="pt-4">
                    Quantity*
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="
                    bg-gray-50
                      border-2
                      rounded
                      px-3
                      py-2
                      w-full
                      focus:outline-none focus:border-blue-400 focus:shadow"
                    onChange={formik.handleChange}
                    value={formik.values.quantity}
                    placeholder="Enter Quantity"
                    required
                  />
                </div>

                <div className="text-red-500 text-center">{msg}</div>
                <div className="flex flex-row justify-between">
                  <button
                    type="button"
                    onClick={deleteRecord}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold my-3 py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                  <button
                    type="submit"
                    className="bg-green-400 hover:bg-green-600 text-white font-bold my-3 py-2 px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateInventory;
