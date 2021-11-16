import React, { useEffect, useState } from "react";
import Contents from "../navigation/Contents";
import { useNavigate, useParams } from "react-router";
// import { useFormik } from "formik";

function UpdateSocietyStaff() {
    const { occu } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const [occupation, setOccupation] = useState("");
    const [aadhaar, setAadhaar] = useState("");
    const [salary, setSalary] = useState("");
    const [work_place, setWorksIn] = useState("");
    const [from_place, setComesFrom] = useState("");
    const [mobile_no, setNumber] = useState("");
    const [image, setImage] = useState("");
    const [count, setCount] = useState(0);
    const isFormInvalid = () => {
        return !(name && occupation && salary && work_place && from_place && mobile_no && image);
    };

    const deleteRecord = () => {
        if (count === 0) {
            setCount(1);
            setMsg("Are you sure you want to delete this record permanently?");
        } else {
            const url = `http://127.0.0.1:8000/api/staff/society_staff/${occu}/`;
            const fetchData = async () => {
                const response = await fetch(url, {
                    method: "DELETE",
                    headers: {
                        authorization: `Token ${localStorage.getItem("token")}`,
                    },
                });
                if (response.ok) {
                    navigate("/societystaff");
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
        const url = `http://127.0.0.1:8000/api/staff/society_staff/${occu}/`;
        const fetchData = async () => {
            const response = await fetch(url, {
                headers: {
                    authorization: `Token ${localStorage.getItem("token")}`,
                },
            });
            const result = await response.json();
            setData(result);
            if (response.ok) {
                console.log(`${occu}`);
                setName(result.name);
                setOccupation(result.occupation);
                setImage(result.image);
                setAadhaar(result.aadhaar);
                setSalary(result.salary);
                setComesFrom(result.from_place);
                setNumber(result.mobile_no);
                setWorksIn(result.work_place);

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

        formData.append("image", image, image.name);
        formData.append("name", name);
        formData.append("occupation", occupation);
        formData.append("aadhaar", aadhaar);
        formData.append("salary", salary);
        formData.append("work_place", work_place);
        formData.append("from_place", from_place);
        formData.append("mobile_no", mobile_no);

        const url = `http://127.0.0.1:8000/api/staff/society_staff/${occu}`;

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
                                        <div className="grid gap-4 gap-y-4 grid-cols-1 md:grid-cols-2">
                                            <div className="md:col-span-1">
                                                <label htmlFor="name">Name*</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    placeholder=""
                                                    onChange={(e) => setName(e.target.value)}
                                                    defaultValue={data.name}
                                                    required
                                                />
                                            </div>

                                            <div className="md:col-span-1">
                                                <label htmlFor="occupation">Occupation*</label>
                                                <input
                                                    type="text"
                                                    name="occupation"
                                                    id="occupation"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    placeholder=""
                                                    onChange={(e) => setOccupation(e.target.value)}
                                                    defaultValue={data.occupation}
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
                                                    placeholder=""
                                                    onChange={(e) => setSalary(e.target.value)}
                                                    defaultValue={data.salary}
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
                                                    placeholder=""
                                                    onChange={(e) => setNumber(e.target.value)}
                                                    defaultValue={data.mobile_no}
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
                                                    placeholder=""
                                                    onChange={(e) => setAadhaar(e.target.value)}
                                                    defaultValue={data.aadhaar}
                                                />
                                            </div>
                                            <div className="md:col-span-1">
                                                <label htmlFor="from_place">Comes from*</label>
                                                <input
                                                    type="text"
                                                    name="from_place"
                                                    id="from_place"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    placeholder=""
                                                    onChange={(e) => setComesFrom(e.target.value)}
                                                    defaultValue={data.from_place}
                                                    // value={formik.values.from_place}
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
                                                    placeholder=""
                                                    onChange={(e) => setWorksIn(e.target.value)}
                                                    defaultValue={data.work_place}
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
                                                    placeholder=""
                                                    onChange={(e) => setImage(e.target.files[0])}
                                                    // defaultValue={data.image}
                                                    required
                                                />
                                            </div>

                                            <div className="md:col-span-2 text-center md:row-start-5 text-red-500">
                                                {msg}
                                            </div>
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

export default UpdateSocietyStaff;
