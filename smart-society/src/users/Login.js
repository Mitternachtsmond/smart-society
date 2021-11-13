import { Link, useNavigate, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";

function Login() {
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      const url = "http://127.0.0.1:8000/api/login/";
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            username: values.username,
            password: values.password,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const result = await response.json();
        if (response.ok) {
          setError("");
          localStorage.setItem("username", values.username);
          localStorage.setItem("token", result.token);
          localStorage.setItem("isLoggedIn", "true");
          navigate("/");
        } else {
          setError(result.error);
        }
      };
      fetchData();
      resetForm({ values: "" });
    },
  });

  if (localStorage.getItem("isLoggedIn")==="true") {
    return <Navigate to="/" />;
  } else {
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
            <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">
              <h1 className="font-bold text-xl text-center">
                Sign in to your account
              </h1>

              <div className="flex flex-col space-y-1">
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="
                  border-2
                  rounded
                  px-3
                  py-2
                  w-full
                  focus:outline-none focus:border-blue-400 focus:shadow
                "
                  placeholder="Username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
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
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  required
                />
              </div>
              <div className="text-red-500 text-center">{error}</div>
              <div
                className="
                flex flex-col-reverse
                sm:flex-row sm:justify-between
                items-center
              "
              >
                <Link
                  to="/forgotpassword"
                  className="
                  inline-block
                  text-blue-500
                  my-1
                  hover:text-blue-800 hover:underline
                "
                >
                  Forgot your password?
                </Link>
                <button
                  type="submit"
                  className="
                  bg-green-500
                  text-white
                  font-bold
                  px-5
                  py-2
                  my-1
                  rounded
                  shadow
                  hover:bg-green-600
                "
                >
                  Log In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
