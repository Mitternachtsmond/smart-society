import Announcement from "../components/Announcement";
import Contents from "../components/Contents";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

function Dashboard() {
  const [announcement, setAnnouncement] = useState([]);

  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values, { resetForm }) => {
      const searchvalues = values.search.split().join("+");

      const url = `http://127.0.0.1:8000/api/society_info/announcements/?search=${searchvalues}`;
      const fetchData = async () => {
        const response = await fetch(url, {
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const array = await response.json();
        resetForm({ values: "" });
        if (response.ok) {
          setAnnouncement(array.results);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.setItem("isLoggedIn", "false");
          navigate("/login");
        }
      };
      fetchData();
    },
  });

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    const url = "http://127.0.0.1:8000/api/society_info/announcements/";
    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const array = await response.json();
      if (response.ok) {
        setAnnouncement(array.results);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div className="h-screen flex">
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
              Announcements
            </h1>
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
            {announcement &&
              announcement.map((element) => {
                return (
                  <Announcement
                    key={element.s_no}
                    category={element.category}
                    description={element.description}
                    date={element.date.toString().slice(0, 10)}
                    author={element.author}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
