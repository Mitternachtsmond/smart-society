import React, { useEffect, useState } from "react";
import Contents from "../navigation/Contents";
import Select from "react-select";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";

function UpdateMember() {
  const { propertyNo } = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [properties, setProperties] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [tenantMobile, setTenantMobile] = useState("");
  const [count, setCount] = useState(0);
  const accountOptions = [];
  const propertyOptions = [];

  const deleteRecord = () => {
    if (count === 0) {
      setCount(1);
      setMsg(
        "Are you sure you want to delete this record permanently? All associated records in other tables will also get deleted."
      );
    } else {
      const url = `${process.env.REACT_APP_BACKEND_HOST}/api/users/members/${propertyNo}/`;
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          navigate("/members");
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
    let url = `${process.env.REACT_APP_BACKEND_HOST}/api/users/accounts/`;
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
    url = `${process.env.REACT_APP_BACKEND_HOST}/api/society_info/properties/`;
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
    url = `${process.env.REACT_APP_BACKEND_HOST}/api/users/members/${propertyNo}/`;
    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setPropertyType(result.property_type);
        setName(result.name);
        setMobile(result.mobile_no);
        setTenantName(result.tenant_name);
        setTenantMobile(result.tenant_mobile);
      } else {
        navigate("/logout");
      }
    };
    fetchData();
  }, [navigate, propertyNo]);

  const formik = useFormik({
    initialValues: {
      propertyNo: `${propertyNo}`,
      propertyType: `${propertyType}`,
      name: `${name}`,
      mobile: `${mobile}`,
      tenantName: `${tenantName ? tenantName : ""}`,
      tenantMobile: `${tenantMobile ? tenantMobile : ""}`,
    },
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      const url = `${process.env.REACT_APP_BACKEND_HOST}/api/users/members/${propertyNo}/`;
      const fetchData = async () => {
        const response = await fetch(url, {
          method: "PUT",
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
          if (
            Object.values(result)[0] === "Invalid Token" ||
            Object.values(result)[0] === "The Token is expired"
          ) {
            navigate("/logout");
          }
          setMsg(Object.values(result)[0].join(" "));
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
            Update Member
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
                            formik.setFieldValue("propertyNo", element.value);
                          }}
                          defaultValue={{
                            label: propertyNo,
                            value: propertyNo,
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
                        {propertyType && (
                          <Select
                            options={propertyOptions}
                            onChange={(element) => {
                              formik.setFieldValue(
                                "propertyType",
                                element.value
                              );
                            }}
                            defaultValue={{
                              value: propertyType,
                              label: propertyType,
                            }}
                            placeholder="Select Property Type"
                          />
                        )}
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

export default UpdateMember;
