import React, { useEffect, useState } from "react";
import Contents from "../navigation/Contents";
import { useNavigate } from "react-router";
import Select from "react-select";

function AddSocietyStaff() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState([]);
  const [aadhaar, setAadhaar] = useState("");
  const [salary, setSalary] = useState("");
  const [worksIn, setWorksIn] = useState("");
  const [comesFrom, setComesFrom] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState("");
  const [account, setAccount] = useState([]);
  const options = [];

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    const url = "http://127.0.0.1:8000/api/users/accounts/";
    const fetchOccupation = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setAccount(result.results);
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
    fetchOccupation();
  }, [navigate]);

  const handleSubmit = () => {
    if (isFormInvalid()) {
      return;
    }
    const formData = new FormData();
    formData.append("image", image, image.name);
    formData.append("name", name);
    formData.append("occupation", occupation);
    formData.append("aadhaar", aadhaar);
    formData.append("salary", salary);
    formData.append("work_place", worksIn);
    formData.append("from_place", comesFrom);
    formData.append("mobile_no", mobile);

    const url = `http://127.0.0.1:8000/api/staff/society_staff/`;

    const fetchData = async () => {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        navigate("/societystaff");
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
  };
  const isFormInvalid = () => {
    return !(
      name &&
      occupation &&
      salary &&
      comesFrom &&
      worksIn &&
      mobile &&
      image
    );
  };

  return (
    <div className="h-screen flex">
      <div className="bg-green-300 dark:bg-gray-800 w-64 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll">
          <div className="md:py-5 flex-grow py-3 text-center dark:text-white uppercase tracking-wider font-semibold text-xl md:text-3xl">
            Add Staff
          </div>
          <div className="mx-3 lg:mx-10 border rounded bg-black flex items-center justify-center">
            <div className="bg-white w-full rounded shadow-lg pt-8 pb-4 px-6 md:p-8">
              <div className="grid gap-4 gap-y-2 grid-cols-1 lg:grid-cols-2">
                <div className="lg:col-span-2">
                  <form>
                    <div className="grid gap-4 gap-y-4 grid-cols-1 md:grid-cols-2">
                      <div className="md:col-span-1">
                        <label htmlFor="name">Name*</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter Name"
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="occupation">Occupation*</label>
                        {account &&
                          account.forEach((element) => {
                            options.push({
                              label: element.username,
                              value: element.username,
                            });
                          })}
                        <Select
                          options={options}
                          placeholder="Enter Occupation"
                          onChange={(option) => setOccupation(option.value)}
                          required
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="name">Salary*</label>
                        <input
                          type="number"
                          name="salary"
                          id="salary"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter Salary"
                          onChange={(e) => setSalary(e.target.value)}
                          required
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="mobile_no">Mobile No*</label>
                        <input
                          type="text"
                          name="mobile_no"
                          id="mobile_no"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter 10 digits"
                          onChange={(e) => setMobile(e.target.value)}
                          required
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="aadhaar">Aadhaar No</label>
                        <input
                          type="text"
                          name="aadhaar"
                          id="aadhaar"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter Aadhaar 12 digits"
                          onChange={(e) => setAadhaar(e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="from_place">Comes from*</label>
                        <input
                          type="text"
                          name="from_place"
                          id="from_place"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Staff comes from place"
                          onChange={(e) => setComesFrom(e.target.value)}
                          required
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="work_place">Works In*</label>
                        <input
                          type="text"
                          name="work_place"
                          id="work_place"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Where staff works in the society"
                          onChange={(e) => setWorksIn(e.target.value)}
                          required
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="image">Image*</label>
                        <input
                          type="file"
                          name="image"
                          id="image"
                          accept="image/*"
                          className="h-10 border mt-1 pt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Staff Image"
                          onChange={(e) => setImage(e.target.files[0])}
                          required
                        />
                      </div>

                      <div className="md:col-span-2 text-center md:row-start-5 text-red-500">
                        {msg}
                      </div>
                      <div className="md:col-span-2 text-right md:row-start-6">
                        <div className="inline-flex items-end">
                          <button
                            type="button"
                            className="bg-green-400 hover:bg-green-600 text-white font-bold my-3 py-2 px-4 rounded"
                            onClick={handleSubmit}
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

export default AddSocietyStaff;
