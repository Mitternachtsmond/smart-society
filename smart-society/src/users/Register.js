import React, { useEffect, useState } from "react";
import Contents from "../navigation/Contents";
import Select from "react-select";
import { useNavigate } from "react-router";
import { useFormik } from "formik";

function Register() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const categoryOptions = [
    { value: "Member", label: "Member" },
    { value: "Admin", label: "Admin" },
    { value: "Security", label: "Security" },
  ];
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
  }, [navigate]);

  const assignCategory = (value) => {
    switch (value) {
      case "Admin":
        return 1;
      case "Member":
        return 2;
      case "Security":
        return 3;
      default:
        return 2;
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      group: "Member",
    },
    onSubmit: (values, { resetForm }) => {
      const url = `http://127.0.0.1:8000/api/register/`;
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password1: values.password,
            password2: values.confirmpassword,
            groups: [assignCategory(values.group)],
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        if (response.ok) {
          resetForm({ values: "" });
          navigate("/accounts");
        } else {
          if (
            Object.values(result)[0] === "Invalid Token" ||
            Object.values(result)[0] === "The Token is expired"
          ) {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.setItem("isLoggedIn", "false");
            navigate("/login");
          }
          setMsg(Object.values(result)[0].join(" "));
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
            Register
          </div>
          <div className="mx-3 lg:mx-10 border rounded bg-black flex items-center justify-center">
            <div className="bg-white w-full rounded shadow-lg pt-8 pb-4 px-6 md:p-8">
              <div className="grid gap-4 gap-y-2 grid-cols-1 lg:grid-cols-2">
                <div className="lg:col-span-2">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="grid gap-4 gap-y-4 grid-cols-1 md:grid-cols-2">
                      <div className="md:col-span-1">
                        <label htmlFor="username">
                          Property Address or Staff Occupation*
                        </label>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          placeholder="Enter Username"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          required
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="email">Email Address*</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="email@domain.com"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          required
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="password">Password*</label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter Password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          required
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="confirmpassword">
                          Confirm Password*
                        </label>
                        <input
                          type="password"
                          name="confirmpassword"
                          id="confirmpassword"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter Password"
                          onChange={formik.handleChange}
                          value={formik.values.confirmpassword}
                          required
                        />
                      </div>

                      <div className="md:col-span-1">
                        Your password can’t be too similar to your other
                        personal information. <br />
                        Your password must contain at least 8 characters. <br />
                        Your password can’t be a commonly used password. <br />
                        Your password can’t be entirely numeric.
                      </div>
                      <div className="md:col-span-1 md:row-start-4">
                        <label htmlFor="group">Category*</label>
                        <Select
                          options={categoryOptions}
                          onChange={(element) => {
                            formik.values.group = element.value;
                          }}
                          placeholder="Select Category"
                        />
                      </div>

                      <div className="md:col-span-2 text-center md:row-start-5 text-red-500">
                        {msg}
                      </div>
                      <div className="md:col-span-2 text-right md:row-start-6">
                        <div className="inline-flex items-end">
                          <button
                            type="submit"
                            className="bg-green-400 hover:bg-green-600 text-white font-bold my-3 py-2 px-4 rounded"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
