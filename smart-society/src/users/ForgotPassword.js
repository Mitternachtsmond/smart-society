import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState("text-blue-500");
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values, { resetForm }) => {
      const url = `${process.env.REACT_APP_BACKEND_HOST}/api/reset_password_email/`;
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: values.email,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const result = await response.json();
        resetForm({ values: "" });
        if (response.ok) {
          setMsg(result.success);
          setMsgColor("text-blue-500");
        } else {
          setMsg(result.error);
          setMsgColor("text-red-500");
        }
      };
      fetchData();
    },
  });

  return (
    <div className="pt-20 pb-5">
      <div
        className="
              flex flex-col
              justify-center
              sm:w-3/4 
              md:w-2/3
              lg:w-1/2
              sm:m-auto
              mx-5
              mb-5
              space-y-8
            "
      >
        <Link to="/">
          <h1 className="font-bold text-center text-4xl text-black dark:text-green-500">
            Smart Society&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="
                    h-7
                    w-7
                    md:h-8 md:w-8
                    inline
                    align-middle
                    "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </h1>
        </Link>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-4">
            <h1 className="font-bold text-xl text-center mb-2">
              Forgot Password
            </h1>

            <div className="flex flex-col space-y-1">
              <input
                type="text"
                name="email"
                id="email"
                className="
                      border-2
                      rounded
                      px-3
                      py-2
                      w-full
                      focus:outline-none focus:border-blue-400 focus:shadow
                    "
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
              />
            </div>

            <div className={`${msgColor} text-center`}>{msg}</div>
            <div
              className="
                  flex flex-row
                  justify-center
                "
            >
              <button
                type="submit"
                className="
                      bg-green-500
                      text-white
                      font-bold
                      px-5
                      py-2
                      rounded
                      shadow
                      hover:bg-green-600
                    "
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
