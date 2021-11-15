import React, { useEffect, useState } from "react";
import Contents from "../navigation/Contents";
import { useNavigate, useParams } from "react-router";
// import { useFormik } from "formik";

function UpdatePersonalStaff() {
  const { s_no } = useParams();
  const navigate = useNavigate();
  const [data,setData]=useState([])
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [image, setImage] = useState("");
  const [count, setCount] = useState(0);
  const isFormInvalid = () => {
    return !(name && occupation && image);
  };

  const deleteRecord = () => {
    if (count === 0) {
      setCount(1);
      setMsg("Are you sure you want to delete this record permanently?");
    } else {
      const url = `http://127.0.0.1:8000/api/staff/personal_staff/${s_no}/`;
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          navigate("/personalstaff");
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
    const url = `http://127.0.0.1:8000/api/staff/personal_staff/${s_no}/`;
    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setData(result);
      if (response.ok) {
        console.log(`${s_no}`);
        setName(result.name);
        setOccupation(result.occupation);
        setImage(result.image);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);
  const handleSubmit = () => {
    // console.log("hello?");
    console.log(isFormInvalid());
    if (isFormInvalid()) {
      return;
    }
    const formData = new FormData();

    formData.append("image", image);
    formData.append("name", name);
    formData.append("occupation", occupation);

    const url = `http://127.0.0.1:8000/api/staff/personal_staff/${s_no}`;

    const fetchData = async () => {
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      console.log(response.ok);
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
        setMsg(Object.values(result)[0].join(" "));
      }
    };
    fetchData();
  };
  // const formik = useFormik({
  //   initialValues: {
  //     name: `${name}`,
  //     occupation: `${occupation}`,
  //   },
  //   enableReinitialize: true,
  //   onSubmit: (values, { resetForm }) => {
  //     const url = `http://127.0.0.1:8000/api/staff/personal_staff/${s_no}/`;
  //     const fetchData = async () => {
  //       const response = await fetch(url, {
  //         method: "PATCH",
  //         body: JSON.stringify({
  //           name: values.name,
  //           occupation: values.occupation,
  //           // image:values.image.name,
  //         }),
  //         headers: {
  //           "Content-type": "application/json; charset=UTF-8",
  //           authorization: `Token ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       const result = await response.json();
  //       if (response.ok) {
  //         resetForm({ values: "" });
  //         navigate("/personalstaff");
  //       } else {
  //         // console.log("jere")
  //         if (
  //           Object.values(result)[0] === "Invalid Token" ||
  //           Object.values(result)[0] === "The Token is expired"
  //         ) {
  //           localStorage.removeItem("token");
  //           localStorage.removeItem("username");
  //           localStorage.setItem("isLoggedIn", "false");
  //           navigate("/login");
  //         }
  //         setMsg(Object.values(result)[0]);
  //       }
  //     };
  //     fetchData();
  //   },
  // });

  return (
    <div className="h-screen flex">
      <div className="bg-green-300 dark:bg-gray-800 w-64 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll">
          <div className="md:py-5 flex-grow py-3 text-center dark:text-white uppercase tracking-wider font-semibold text-xl md:text-3xl">
            Update Staff
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
            {/* <form onSubmit={formik.handleSubmit}> */}
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
                    defaultValue={data.name}
                    // value={formik.values.name}
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
                    defaultValue={data.occupation}
                    // value={formik.values.occupation}
                    required
                  />
                   <label htmlFor="image" className="pt-4">
                    Person Image
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
                    // defaultValue={data.image}
                    // value={formik.values.image}
                    required
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
                    onClick={handleSubmit}
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

export default UpdatePersonalStaff;
