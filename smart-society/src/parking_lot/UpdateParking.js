import React, { useEffect, useState } from "react";
import Contents from "../navigation/Contents";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import Select from "react-select";

function UpdateParking() {
  const { parkingId } = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [propertyNo, setPropertyNo] = useState("");
  const [count, setCount] = useState(0);
  const [members, setMembers] = useState([]);
  const options = [];
  options.push({
    label: "Visitor",
    value: "",
  });

  const deleteRecord = () => {
    if (count === 0) {
      setCount(1);
      setMsg("Are you sure you want to delete this record permanently?");
    } else {
      const url = `http://127.0.0.1:8000/api/parking_lot/parking/${parkingId}/`;
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          navigate("/parking");
        } else {
          navigate("/logout");
        }
      };
      fetchData();
    }
  };
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    let url = "http://127.0.0.1:8000/api/users/members/";
    const fetchMembers = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const array = await response.json();
      if (response.ok) {
        setMembers(array.results);
      } else {
        navigate("/logout");
      }
    };
    fetchMembers();
  }, [navigate]);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    const url = `http://127.0.0.1:8000/api/parking_lot/parking/${parkingId}/`;
    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setPropertyNo(
          result.property_no === null ? "Visitor" : result.property_no
        );
      } else {
        navigate("/logout");
      }
    };
    fetchData();
  }, [navigate, parkingId]);

  const formik = useFormik({
    initialValues: {
      parkingId: `${parkingId}`,
      propertyNo: `${propertyNo === "Visitor" ? "" : propertyNo}`,
    },
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      const url = `http://127.0.0.1:8000/api/parking_lot/parking/${parkingId}/`;
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify({
            parking_id: values.parkingId,
            property_no: values.propertyNo,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        if (response.ok) {
          resetForm({ values: "" });
          navigate("/parking");
        } else {
          if (
            Object.values(result)[0] === "Invalid Token" ||
            Object.values(result)[0] === "The Token is expired"
          ) {
            navigate("/logout");
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
            Update Parking
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
                  <label htmlFor="parkingId">Parking Id*</label>
                  <input
                    type="text"
                    name="parkingId"
                    id="parkingId"
                    className="
                    bg-gray-50
                      border-2
                      rounded
                      px-3
                      py-2
                      w-full
                      focus:outline-none focus:border-blue-400 focus:shadow"
                    onChange={formik.handleChange}
                    value={formik.values.parkingId}
                    placeholder="Enter Parking ID"
                    required
                  />
                  <label htmlFor="propertyNo" className="pt-2">
                    Property No.*
                  </label>
                  {members &&
                    members.forEach((element) => {
                      options.push({
                        label: element.property_no,
                        value: element.property_no,
                      });
                    })}
                  {propertyNo && (
                    <Select
                      options={options}
                      onChange={(element) => {
                        formik.setFieldValue("propertyNo", element.value);
                      }}
                      defaultValue={{
                        value: propertyNo === "Visitor" ? "" : propertyNo,
                        label: propertyNo,
                      }}
                      placeholder="Select Property"
                    />
                  )}
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
                    onClick={formik.handleSubmit}
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

export default UpdateParking;
