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
    mobile: "-",
    property: "-",
    maintenance: 0,
    tenantMobile: "-",
    tenantName: "-",
    parking: [],
  });

  const assignGroup = (value) => {
    switch (parseInt(value)) {
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

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    let url = `${process.env.REACT_APP_BACKEND_HOST}/api/users/accounts/${username}`;
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
        }));
      } else {
        navigate("/logout");
      }
    };
    fetchAccount();
    url = `${process.env.REACT_APP_BACKEND_HOST}/api/users/members/${username}/`;
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
        navigate("/logout");
      }
    };
    if (localStorage.getItem("group") === "2") fetchMember();
    url = `${process.env.REACT_APP_BACKEND_HOST}/api/parking_lot/parking/?search=${username}`;
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
        navigate("/logout");
      }
    };
    fetchParking();
    url = `${process.env.REACT_APP_BACKEND_HOST}/api/payments/maintenance/?search=${username}`;
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
        navigate("/logout");
      }
    };
    if (localStorage.getItem("group") === "2") fetchMaintenance();
  }, [navigate, username]);

  return (
    <div className="h-screen flex">
      <div className="bg-white dark:bg-gray-800 w-48 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll">
          <div className="flex px-2 sm:px-6 md:px-10 pt-5 pb-2">
            <div className=" invisible flex-grow-0 px-2 py-1 w-auto border rounded bg-blue-100 text-blue-500">
              Logout
            </div>
            <div className="flex-grow text-center dark:text-white uppercase tracking-wider font-semibold text-3xl">
              Profile
            </div>
            <Link to="/logout">
              <button className="font-semibold flex-grow-0 px-3 py-2 w-auto border rounded bg-red-500 text-white">
                Logout
              </button>
            </Link>
          </div>
          <div className="py-6 px-1 md:px-5 font-sans w-auto flex flex-row justify-evenly">
            <div
              className={
                localStorage.getItem("group") === "2"
                  ? `
                  bg-white
                  w-full
                  sm:mx-5
                  shadow-lg
                  hover:shadow
                  px-8
                  py-6
                  md:px-10
                  lg:py-10
                  rounded-lg
                  lg:grid lg:grid-cols-2 gap-6
                `
                  : `
                  bg-white
                  xl:w-1/2
                  lg:w-2/3
                  md:w-3/4
                  sm:mx-5
                  w-full
                  shadow-lg
                  hover:shadow
                  px-4
                  py-6
                  md:px-10
                  lg:py-10
                  rounded-lg
                  lg:grid lg:grid-cols-1 gap-6`
              }
            >
              <div>
                
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
                {localStorage.getItem("group") === "2" ? (
                  profile.maintenance === 0 ? (
                    <div className="text-center mt-5 bg-blue-100 text-xl rounded-lg px-3 py-4">
                      <div className="font-semibold text-blue-400">
                        Maintenance
                      </div>
                      <div className="mx-3">All dues clear</div>
                    </div>
                  ) : profile.maintenance < 0 ? (
                    <div className="text-center mt-5 bg-green-100 text-xl rounded-lg px-3 py-4">
                      <div className="font-semibold text-green-500">
                        Maintenance
                      </div>
                      <div className="mx-3">
                        Advance of ₹{Math.abs(profile.maintenance)} already paid
                      </div>
                    </div>
                  ) : (
                    <div className="text-center mt-5  text-xl rounded-lg px-3 py-4">
                      <div className="font-semibold text-red-500">
                        Maintenance
                      </div>
                      <div className="mx-3">
                        Due ₹{profile.maintenance} by the end of this month
                      </div>
                    </div>
                  )
                ) : (
                  <></>
                )}
              </div>
              {localStorage.getItem("group") === "2" ? (
                <div className="md:py-8">
                  <div className="text-center my-5 text-2xl font-medium">
                    Property Information
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="px-1 md:px-10 text-lg py-2">Category</div>
                    <div className="px-1 md:px-10 text-lg py-2">
                      {assignGroup(localStorage.getItem("group"))}
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
                        : "-"}
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
                      {profile.tenantName}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="px-1 md:px-10 text-lg py-2">
                      Tenant Mobile
                    </div>
                    <div className="px-1 md:px-10 text-lg py-2">
                      {profile.tenantMobile}
                    </div>
                  </div>
                  
                </div>
              ) : (
                <div className="text-center my-5 text-2xl font-medium">
                  {assignGroup(localStorage.getItem("group"))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
