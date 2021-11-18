import React, { useEffect, useState } from "react";
import NavbarMobileLink from "./NavbarMobileLink";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const username = localStorage.getItem("username");
  let location = useLocation();
  const [menuDisplay, setMenu] = useState("hidden");

  const toggleMenu = () => {
    if (menuDisplay === "hidden") {
      setMenu("");
    } else {
      setMenu("hidden");
    }
  };

  useEffect(() => {
    const handleWindowClick = () => setMenu("hidden");
    if (menuDisplay === "") {
      window.addEventListener("click", handleWindowClick);
    } else {
      window.removeEventListener("click", handleWindowClick);
    }
    return () => window.removeEventListener("click", handleWindowClick);
  }, [menuDisplay, setMenu]);

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 px-4 ">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <Link to={localStorage.getItem("group") === "3" ? "/gatelog" : "/"}>
              <h2 className="text-green-500 text-2xl md:text-3xl font-bold p-4">
                Smart Society
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="
                    h-7
                    w-7
                    md:h-8 md:w-8
                    inline
                    align-text-top
                    "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </h2>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/profile"
              className="
                py-2
                px-2
                text-xl
                font-medium
                text-green-500
                transition
                duration-300
              "
            >
              {username}
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              className="outline-none z-20"
              onClick={toggleMenu}
              id="menu-button"
            >
              <svg
                className="w-6 h-6 text-gray-500 hover:text-green-500"
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`
        h-screen
        w-screen
        z-10
        bg-gray-900
        fixed
        top-0
        opacity-30
        md:hidden
        ${menuDisplay}
        `}
        id="backdrop"
      ></div>
      <div
        className={`
        md:hidden
        ${menuDisplay}
        w-48
        mt-2
        fixed
        right-0
        top-10
        rounded-md
        font-semibold
        shadow-md
        z-20
        `}
      >
        <NavbarMobileLink
          activeState={location.pathname === "/profile"}
          title="Profile"
          slug="profile"
        />

        {localStorage.getItem("group") === "3" ? (
          <>
            <NavbarMobileLink
              activeState={location.pathname === "/gatelog"}
              title="Home"
              slug="gatelog"
            />
          </>
        ) : (
          <>
            <NavbarMobileLink
              activeState={location.pathname === "/"}
              title="Home"
              slug=""
            />
            <NavbarMobileLink
              activeState={location.pathname === "/accounts"}
              title="Accounts"
              slug="accounts"
            />
            <NavbarMobileLink
              activeState={location.pathname === "/members"}
              title="Members"
              slug="members"
            />
            <NavbarMobileLink
              activeState={location.pathname === "/properties"}
              title="Properties"
              slug="properties"
            />
            <NavbarMobileLink
              activeState={location.pathname === "/inventory"}
              title="Inventory"
              slug="inventory"
            />
            <NavbarMobileLink
              activeState={location.pathname === "/maintenance"}
              title="Maintenance"
              slug="maintenance"
            />

            <NavbarMobileLink
              activeState={location.pathname === "/societystaff"}
              title="Society Staff"
              slug="societystaff"
            />
            <NavbarMobileLink
              activeState={location.pathname === "/personalstaff"}
              title="Personal Staff"
              slug="personalstaff"
            />
            <NavbarMobileLink
              activeState={location.pathname === "/polls"}
              title="Polls"
              slug="polls"
            />
          </>
        )}
        {localStorage.getItem("group") === "1" && (
          <>
            <NavbarMobileLink
              activeState={location.pathname === "/transactions"}
              title="Transactions"
              slug="transactions"
            />
            <NavbarMobileLink
              activeState={location.pathname === "/gatelog"}
              title="Gate Log"
              slug="gatelog"
            />
          </>
        )}
        <NavbarMobileLink
          activeState={location.pathname === "/parking"}
          title="Parking"
          slug="parking"
        />
      </div>
    </>
  );
}

export default Navbar;
