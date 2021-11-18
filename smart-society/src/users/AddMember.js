import React, { useEffect, useState } from "react";
import Contents from "../navigation/Contents";
import Select from "react-select";
import { useNavigate } from "react-router";
import { useFormik } from "formik";

function AddMember() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [properties, setProperties] = useState([]);
  const accountOptions = [];
  const propertyOptions = [];
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    let url = "http://127.0.0.1:8000/api/users/accounts/";
    const fetchAccounts = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const array = await response.json();
      if (response.ok) {
        setAccounts(array.results);
      } else {
        navigate("/logout");
      }
    };
    fetchAccounts();
    url = "http://127.0.0.1:8000/api/society_info/properties/";
    const fetchProperties = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const array = await response.json();
      if (response.ok) {
        setProperties(array.results);
      } else {
        navigate("/logout");
      }
    };
    fetchProperties();
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      propertyNo: "",
      propertyType: "",
      name: "",
      mobile: "",
      tenantName: "",
      tenantMobile: "",
    },
    onSubmit: (values, { resetForm }) => {
      const url = `http://127.0.0.1:8000/api/users/members/`;
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            property_no: values.propertyNo,
            property_type: values.propertyType,
            name: values.name,
            mobile_no: values.mobile,
            tenant_name: values.tenantName
              ? values.tenantName
              : JSON.parse(null),
            tenant_mobile: values.tenantMobile
              ? values.tenantMobile
              : JSON.parse(null),
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        if (response.ok) {
          resetForm({ values: "" });
          navigate("/members");
        } else {
          const values = Object.values(result);
          if (
            values[0] === "Invalid Token" ||
            values[0] === "The Token is expired"
          ) {
            navigate("/logout");
          }
          setMsg(values[0]);
        }
      };
      fetchData();
    },
  });

  return (
    <div className="h-screen flex">
      <div className="bg-white dark:bg-gray-800 w-48 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll">
          <div className="md:py-5 flex-grow py-3 text-center dark:text-white uppercase tracking-wider font-semibold text-xl md:text-3xl">
            Add Member
          </div>
          <div className="mx-3 lg:mx-10 border rounded bg-black flex items-center justify-center">
            <div className="bg-white w-full rounded shadow-lg pt-8 pb-4 px-6 md:p-8">
              <div className="grid gap-4 gap-y-2 grid-cols-1 lg:grid-cols-2">
                <div className="lg:col-span-2">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="grid gap-4 gap-y-4 grid-cols-1 md:grid-cols-2">
                      <div className="md:col-span-1">
                        <label htmlFor="propertyNo">Property No.*</label>
                        {accounts &&
                          accounts.forEach((element) => {
                            accountOptions.push({
                              label: element.username,
                              value: element.username,
                            });
                          })}
                        <Select
                          options={accountOptions}
                          onChange={(element) => {
                            formik.values.propertyNo = element.value;
                          }}
                          placeholder="Select Property Number"
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="propertyType">Property Type*</label>
                        {properties &&
                          properties.forEach((element) => {
                            propertyOptions.push({
                              label: element.property_type,
                              value: element.property_type,
                            });
                          })}
                        <Select
                          options={propertyOptions}
                          onChange={(element) => {
                            formik.values.propertyType = element.value;
                          }}
                          placeholder="Select Property Type"
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="name">Name*</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter Name"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          required
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="mobile">Mobile No.*</label>
                        <input
                          type="tel"
                          pattern="[0-9]{10}"
                          title="Enter 10 digits"
                          name="mobile"
                          id="mobile"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter Mobile No."
                          onChange={formik.handleChange}
                          value={formik.values.mobile}
                          required
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="tenantName">Tenant Name</label>
                        <input
                          type="text"
                          name="tenantName"
                          id="tenantName"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter Name"
                          onChange={formik.handleChange}
                          value={formik.values.tenantName}
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="tenantMobile">Tenant Mobile No.</label>
                        <input
                          type="tel"
                          pattern="[0-9]{10}"
                          title="Enter 10 digits"
                          name="tenantMobile"
                          id="tenantMobile"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter Mobile No."
                          onChange={formik.handleChange}
                          value={formik.values.tenantMobile}
                        />
                      </div>

                      <div className="md:col-span-2 text-center md:row-start-4 text-red-500">
                        {msg}
                      </div>
                      <div className="md:col-span-2 text-right md:row-start-5">
                        <div className="inline-flex items-end">
                          <button
                            type="submit"
                            className="bg-green-400 hover:bg-green-600 text-white font-bold my-3 py-2 px-4 rounded"
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

export default AddMember;
