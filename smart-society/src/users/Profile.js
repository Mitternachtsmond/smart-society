import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Contents from "../navigation/Contents";
import src from "../icons/user.png";

function Profile() {
  const username = localStorage.getItem("username");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    group: "",
    property: "",
    maintenance: 0,
    tenantMobile: "",
    tenantName: "",
    parking: [],
  });

  const assignGroup = (value) => {
    switch (value) {
      case 1:
        return "Admin";
      case 2:
        return "Member";
      case 3:
        return "Security";
      case 4:
        return "Staff";
      default:
        return "Member";
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    let url = `http://127.0.0.1:8000/api/users/accounts/${username}`;
    const fetchAccount = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setProfile((profile) => ({
          ...profile,
          email: result["email"],
          group: assignGroup(result["groups"][0]),
        }));
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");
      }
    };
    fetchAccount();
    url = `http://127.0.0.1:8000/api/users/members/${username}/`;
    const fetchMember = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setProfile((profile) => ({
          ...profile,
          name: result["name"],
          mobile: result["mobile_no"],
          property: result["property_type"],
          tenantName: result["tenant_name"],
          tenantMobile: result["tenant_mobile"],
        }));
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");
      }
    };
    fetchMember();
    url = `http://127.0.0.1:8000/api/parking_lot/parking/?search=${username}`;
    const fetchParking = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setProfile((profile) => ({
          ...profile,
          parking: result.results
            .filter((element) => element["property_no"] === username)
            .map((element) => element["parking_id"]),
        }));
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");
      }
    };
    fetchParking();
    url = `http://127.0.0.1:8000/api/payments/maintenance/?search=${username}`;
    const fetchMaintenance = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setProfile((profile) => ({
          ...profile,
          maintenance: result.results[0]["amount_due"],
        }));
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");
      }
    };
    fetchMaintenance();
  }, [navigate, username]);
  return (
    <div className="h-screen flex">
      <div className="bg-green-300 dark:bg-gray-800 w-64 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1  overflow-y-scroll">
          <h1 className="text-2xl uppercase md:text-4xl font-bold text-center pt-4 md:pt-5 md:pb-1 dark:text-white">
            Profile
          </h1>
          <div className="py-6 px-5 md:px-1 font-sans w-auto flex flex-row justify-evenly">
            <div
              className="
                  w-full
                  mx-auto
                  bg-white
                  shadow-xl
                  hover:shadow
                  px-4
                  py-6
                  md:px-8
                  lg:py-10
                  rounded-lg
                  lg:grid lg:grid-cols-2 gap-6
                "
            >
              <div>
              <div className="px-3 text-lg py-2 flex place-content-end lg:hidden">
                  <Link to="/logout">
                    <button
                      className="px-3 py-2 border rounded font-bold text-white bg-red-500 "
                    >
                      Logout
                    </button>
                  </Link>
                </div>
                <div className="font-medium">
                  <img src={src} alt="User" className="h-40 w-40 mx-auto" />
                </div>
                <div className="text-center text-3xl font-medium">
                  {profile.name}
                </div>
                <div className="text-center mt-2 text-2xl font-medium">
                  {username}
                </div>
                <div className="text-center mt-2 text-xl font-medium">
                  {profile.email}
                </div>
                <Link to="/changepassword">
                  <div className="text-center mt-2 text-lg text-blue-500">
                    Change Password
                  </div>
                </Link>
                {profile.maintenance === 0 ? (
                  <div className="text-center mt-5 bg-green-100 text-xl rounded-lg px-3 py-4">
                    <div className="font-semibold text-green-400">
                      Maintenance
                    </div>
                    <div className="mx-3">All you dues are clear</div>
                  </div>
                ) : (
                  <div className="text-center mt-5 bg-red-100 text-xl rounded-lg px-3 py-4">
                    <div className="font-semibold text-red-500">
                      Maintenance
                    </div>
                    <div className="mx-3">
                      Due Rs. {profile.maintenance} by the end of this month
                    </div>
                  </div>
                )}
              </div>
              <div className="md:py-8">
                <div className="text-center my-5 text-2xl font-medium">
                  Property Information
                </div>
                <div className="flex flex-row justify-between">
                  <div className="px-1 md:px-10 text-lg py-2">Category</div>
                  <div className="px-1 md:px-10 text-lg py-2">
                    {profile.group}
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="px-1 md:px-10 text-lg py-2">Mobile</div>
                  <div className="px-1 md:px-10 text-lg py-2">
                    {profile.mobile}
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="px-1 md:px-10 text-lg py-2">Parking</div>
                  <div className="px-1 md:px-10 text-lg py-2">
                    {profile.parking.length > 0
                      ? profile.parking.join(", ")
                      : "No Parking"}
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="px-1 md:px-10 text-lg py-2">Property</div>
                  <div className="px-1 md:px-10 text-lg py-2">
                    {profile.property}
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="px-1 md:px-10 text-lg py-2">Tenant</div>
                  <div className="px-1 md:px-10 text-lg py-2">
                    {profile.tenantName ? profile.tenantName : "-"}
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="px-1 md:px-10 text-lg py-2">
                    Tenant Mobile
                  </div>
                  <div className="px-1 md:px-10 text-lg py-2">
                    {profile.tenantMobile ? profile.tenantMobile : "-"}
                  </div>
                </div>
                <div className="px-1 md:px-10 text-lg py-2 hidden lg:flex place-content-end">
                  <Link to="/logout">
                    <button
                      className="px-3 py-2 border rounded font-bold text-white bg-red-500 "
                    >
                      Logout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
