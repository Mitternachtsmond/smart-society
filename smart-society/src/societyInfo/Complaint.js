import React, { useState, useEffect } from "react";
import Contents from "../navigation/Contents";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

function Complaint() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
  }, [navigate]);
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values, { resetForm }) => {
      const url = "http://127.0.0.1:8000/api/society_info/announcements/";
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            category: "Complaint",
            description: values.search,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          setMsg("The complaint was filed!");
        } else {
          setMsg("");
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.setItem("isLoggedIn", "false");
          navigate("/login");
        }
        resetForm({ values: "" });
      };
      fetchData();
    },
  });
  return (
    <div className="h-full flex">
      <div className="bg-green-300 dark:bg-gray-800 w-64 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll">
          <div
            className="
                pb-10
                pt-4
                px-5
                sm:px-10
                md:px-10
                lg:px-10
                "
          >
            <h1 className="text-2xl uppercase md:text-4xl font-bold text-center md:pt-5 md:pb-1 dark:text-white">
              Complaint
            </h1>
            <form className="mt-10" onSubmit={formik.handleSubmit}>
              <textarea
                className="w-full px-4 py-2 border rounded"
                placeholder="Your complaint"
                rows={12}
                name="search"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.search}
              />
              <div className="my-5 flex flex-row-reverse">
                <button
                  type="submit"
                  className="px-3 py-2 border rounded font-bold dark:text-white text-black bg-white dark:bg-green-500"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="text-center flex place-content-center text-black dark:text-white">
              {msg}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complaint;
