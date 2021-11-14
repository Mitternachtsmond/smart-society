import React, { useEffect, useState } from "react";
import Contents from "../navigation/Contents";
import Select from "react-select";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";

function UpdateAccount() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState(2);
  const [count, setCount] = useState(0);
  const categoryOptions = [
    { value: "Member", label: "Member" },
    { value: "Admin", label: "Admin" },
    { value: "Security", label: "Security" },
  ];
  const deleteRecord = () => {
    if (count === 0) {
      setCount(1);
      setMsg("Are you sure you want to delete this record permanently?");
    } else {
      const url = `http://127.0.0.1:8000/api/users/accounts/${username}`;
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          navigate("/accounts");
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.setItem("isLoggedIn", "false");
          navigate("/login");
        }
      };
      fetchData();
    }
  };
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    const url = `http://127.0.0.1:8000/api/users/accounts/${username}`;
    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setEmail(result.email);
        setGroup(result.groups[0]);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate, username]);

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
  const assignGroup = (value) => {
    switch (value) {
      case 1:
        return "Admin";
      case 2:
        return "Member";
      case 3:
        return "Security";
      default:
        return "Member";
    }
  };

  const formik = useFormik({
    initialValues: {
      username: `${username}`,
      email: `${email}`,
      group: assignGroup(group),
    },
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      const url = `http://127.0.0.1:8000/api/users/accounts/${username}`;
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify({
            username: values.username,
            email: values.email,
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
            Update Account
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
                  <label htmlFor="username">
                    Property Address or Staff Occupation*
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="
                    bg-gray-50
                      border-2
                      rounded
                      px-3
                      py-2
                      w-full
                      focus:outline-none focus:border-blue-400 focus:shadow"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="Enter Username"
                    required
                  />
                  <label htmlFor="email" className="pt-4">
                    Email*
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="
                    bg-gray-50
                      border-2
                      rounded
                      px-3
                      py-2
                      w-full
                      focus:outline-none focus:border-blue-400 focus:shadow"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="email@domain.com"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="group">Category*</label>
                  <Select
                    options={categoryOptions}
                    onChange={(element) => {
                      formik.values.group = element.value;
                    }}
                    placeholder="Select Category"
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

export default UpdateAccount;
