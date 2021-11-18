import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Poll from "./Poll";
import Contents from "../navigation/Contents";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

function Polls() {
  const [polls, setPolls] = useState([]);
  const url = "http://127.0.0.1:8000/api/polls";

  let navigate = useNavigate();
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const array = await response.json();
      if (response.ok) {
        setPolls(array.results);
      } else {
        navigate("/logout");
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function endPoll(id) {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    await fetchData(url);
  }

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url, {
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const array = await response.json();
        if (response.ok) {
          setPolls(array.results);
        } else {
          navigate("/logout");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData(url);
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values, { resetForm }) => {
      fetchData(`${url}/?search=${values.search}`);
      resetForm({ values: "" });
    },
  });

  return (
    <div className="h-screen flex">
      <div className="bg-white dark:bg-gray-800 w-48 hidden md:flex">
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
            <div className="flex">
              <div className="flex-grow px-3 text-center dark:text-white uppercase tracking-wider font-semibold  text-xl md:text-3xl">
                Polls
              </div>
              {localStorage.getItem("group") === "1" ? (
                <Link to="/polls/add">
                  <button className="flex-grow-0 px-2 py-1 w-auto border rounded bg-blue-100 text-blue-500">
                    + Add Poll
                  </button>
                </Link>
              ) : (
                <div className="invisible flex-grow-0 px-2 py-1 w-auto border rounded bg-blue-100 text-blue-500">
                  + Add Poll
                </div>
              )}
            </div>
            <form
              className="border rounded flex mt-5"
              onSubmit={formik.handleSubmit}
            >
              <input
                type="text"
                className="w-full px-4 py-2"
                placeholder="Search..."
                name="search"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.search}
              />
              <button type="submit" className="px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
            {polls &&
              polls.map((element) => {
                return (
                  <Poll
                    key={element.s_no}
                    id={element.s_no}
                    title={element.title}
                    question={element.question}
                    handler={endPoll}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Polls;
