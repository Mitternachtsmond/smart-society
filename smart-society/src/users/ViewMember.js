import React, { useEffect, useState } from "react";
import Contents from "../navigation/Contents";
import { useNavigate, useParams } from "react-router";

function ViewMember() {
  const { propertyNo } = useParams();
  const navigate = useNavigate();
  const [propertyType, setPropertyType] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [tenantMobile, setTenantMobile] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }

    const url = `http://127.0.0.1:8000/api/users/members/${propertyNo}/`;
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
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate, propertyNo]);

  return (
    <div className="h-screen flex">
      <div className="bg-green-300 dark:bg-gray-800 w-64 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll">
          <div className="md:py-5 flex-grow py-3 text-center dark:text-white uppercase tracking-wider font-semibold text-xl md:text-3xl">
            View Member
          </div>
          <div className="mx-3 lg:mx-10 border rounded bg-black flex items-center justify-center">
            <div className="bg-white w-full rounded shadow-lg pt-8 pb-4 px-6 md:p-8">
              <div className="grid gap-4 gap-y-2 grid-cols-1 lg:grid-cols-2">
                <div className="lg:col-span-2">
                  <form>
                    <div className="grid gap-4 gap-y-4 grid-cols-1 md:grid-cols-2">
                      <div className="md:col-span-1">
                        <label htmlFor="propertyNo">Property No.</label>
                        <input
                          type="text"
                          name="propertyNo"
                          id="propertyNo"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={propertyNo}
                          readOnly
                          disabled
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="propertyType">Property Type*</label>
                        <input
                          type="text"
                          name="propertyType"
                          id="propertyType"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={propertyType}
                          readOnly
                          disabled
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="name">Name*</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={name}
                          readOnly
                          disabled
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
                          value={mobile}
                          readOnly
                          disabled
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="tenantName">Tenant Name</label>
                        <input
                          type="text"
                          name="tenantName"
                          id="tenantName"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={tenantName ? tenantName : ""}
                          readOnly
                          disabled
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
                          value={tenantMobile ? tenantMobile : ""}
                          readOnly
                          disabled
                        />
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

export default ViewMember;
