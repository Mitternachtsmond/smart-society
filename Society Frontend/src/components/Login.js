import { Link } from "react-router-dom";

function Login() {
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
          <h1 className="font-bold text-center text-4xl text-green-500">
            Smart Society
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 inline align-text-top"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </h1>
        </Link>
        <form action="#">
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
                required
              />
            </div>
            <div className="text-red-500 text-center">Error if Any</div>
            <div
              className="
                flex flex-col-reverse
                sm:flex-row sm:justify-between
                items-center
              "
            >
              <Link
                To="/"
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
                  focus:outline-none
                  shadow
                  hover:bg-green-600
                  transition-colors
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

export default Login;
