import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

function ChangePassword() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState("text-blue-500");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      oldpassword: "",
      password: "",
      confirmpassword: "",
    },
    onSubmit: (values, { resetForm }) => {
      const url = "http://127.0.0.1:8000/api/change_password/";
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify({
            old_password: values.oldpassword,
            new_password1: values.password,
            new_password2: values.confirmpassword,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        if (response.ok) {
          setMsgColor("text-blue-500");
          setMsg(result.message);
          resetForm({ values: "" });
        } else {
          setMsgColor("text-red-500");
          if (
            Object.values(result)[0] === "Invalid Token" ||
            Object.values(result)[0] === "The Token is expired"
          ) {
            navigate("/logout");
          }
          setMsg(Object.values(result)[0].join(" "));
        }
      };
      fetchData();
    },
  });

  return (
    <div className="pt-14 pb-5">
      <div
        className="
            flex flex-col
            justify-center
            sm:w-3/4 
            md:w-2/3
            lg:w-1/3
            sm:m-auto
            mx-5
            mb-5
            space-y-8
          "
      >
        <Link to="/">
          <h1 className="font-bold text-center text-4xl text-green-500 dark:text-green-500">
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
          <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-5">
            <h1 className="font-bold text-xl text-center mb-5 text-green-500">
              Change Password
            </h1>
            <div className="flex flex-col space-y-1">
              <input
                type="password"
                name="oldpassword"
                id="oldpassword"
                className="
                    border-2
                    rounded
                    px-3
                    py-2
                    w-full
                    focus:outline-none focus:border-blue-400 focus:shadow
                  "
                placeholder="Old Password"
                onChange={formik.handleChange}
                value={formik.values.oldpassword}
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <input
                type="password"
                name="password"
                id="password"
                className="
                    border-2
                    rounded
                    px-3
                    py-2
                    w-full
                    focus:outline-none focus:border-blue-400 focus:shadow
                  "
                placeholder="New Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                className="
                    border-2
                    rounded
                    px-3
                    py-2
                    w-full
                    focus:outline-none focus:border-blue-400 focus:shadow
                  "
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                value={formik.values.confirmpassword}
                required
              />
            </div>

            <div className={`${msgColor} text-center`}>{msg}</div>

            <div className=" text-gray-500">
              Your password can’t be too similar to your other personal
              information. <br />
              Your password must contain at least 8 characters. <br />
              Your password can’t be a commonly used password. <br />
              Your password can’t be entirely numeric.
            </div>
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

export default ChangePassword;
