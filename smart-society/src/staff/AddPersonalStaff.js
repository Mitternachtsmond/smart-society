import React, { useEffect, useState } from "react";
import Contents from "../navigation/Contents";
import { useNavigate } from "react-router";

function AddPersonalStaff() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("image", image, image.name);
    formData.append("name", name);
    formData.append("occupation", occupation);

    const url = `http://127.0.0.1:8000/api/staff/personal_staff/`;

    const fetchData = async () => {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          // "content-type": "multipart/form-data",
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        navigate("/personalstaff");
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
            <form>
              <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="
                    bg-gray-50
                      border-2
                      rounded
                      px-3
                      py-2
                      w-full
                      focus:outline-none focus:border-blue-400 focus:shadow"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label htmlFor="occupation" className="pt-4">
                    Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    id="occupation"
                    className="
                    bg-gray-50
                      border-2
                      rounded
                      px-3
                      py-2
                      w-full
                      focus:outline-none focus:border-blue-400 focus:shadow"
                    onChange={(e) => setOccupation(e.target.value)}
                    required
                  />
                  <label htmlFor="image" className="pt-4">
                    Staff Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    className="
                    bg-gray-50
                      border-2
                      rounded
                      px-3
                      py-2
                      w-full
                      focus:outline-none focus:border-blue-400 focus:shadow"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </div>
                <div className="text-red-500 text-center">{msg}</div>
                <div className="flex flex-row-reverse">
                  <button
                    type="button"
                    className="bg-green-400 hover:bg-green-600 text-white font-bold my-3 py-2 px-4 rounded"
                    onClick={handleSubmit}
                  >
                    Submit
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

export default AddPersonalStaff;