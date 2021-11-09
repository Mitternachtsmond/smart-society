import React, { useRef } from "react";
import NavbarLink from "./NavbarLink";
import NavbarMobileLink from "./NavbarMobileLink";
import { Link, useLocation } from "react-router-dom";

function Navbar(props) {
  let location = useLocation();

  const menuDisplay = useRef("hidden");
  // const otherDisplay = useRef("hidden");
  const otherLink = useRef();

  // let otherDisplay = "hidden";
  const toggleMenu = () => {
    if (menuDisplay.current === "hidden") {
      menuDisplay.current = "";
    } else {
      menuDisplay.current = "hidden";
    }
  };

  const toggleDropdown = () => {
    let a = otherLink.current.classList;
    console.log(a);
    if (a.contains("md:hidden")) {
      a.replace("md:hidden", "md:block");
    } else {
      a.replace("md:block", "md:hidden");
    }
  };

  // document.addEventListener("click", function (event) {
  //   let otherbtn = document.getElementById("other-button");
  //   let btn = document.getElementById("menu-button");
  //   let isClickInsideMenu = btn.contains(event.target);
  //   if (!isClickInsideMenu) {
  //     menuDisplay.current = "hidden";
  //   }
  //   let isClickInsideOther = otherbtn.contains(event.target);
  //   if (!isClickInsideOther) {
  //     menuDisplay.current = "hidden";
  //   }
  // });
  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 px-4 ">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/">
                <h2 className="text-green-500 text-2xl md:text-3xl font-bold p-4">
                  Simply
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="
                      h-7
                      w-7
                      md:h-8 md:w-8
                      inline
                      align-top
                      md:align-text-top
                    "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </h2>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <NavbarLink activeState={location.pathname === "/"} />
              <NavbarLink
                title="Maintenance"
                slug="maintenance"
                activeState={location.pathname === "/maintenance"}
              />
              <NavbarLink
                title="Transactions"
                slug="transactions"
                activeState={location.pathname === "/transactions"}
              />
              <div>
                <div onClick={toggleDropdown} id="other-button">
                  <NavbarLink
                    title="Others"
                    slug="others"
                    activeState={
                      location.pathname !== "/maintenance" &&
                      location.pathname !== "/transactions" &&
                      location.pathname !== "/"
                    }
                  />
                </div>
                <div
                  onClick={toggleDropdown}
                  ref={otherLink}
                  className={`
                    hidden md:hidden
                    w-36
                    mt-6
                    absolute
                    rounded-md
                    font-semibold
                    shadow-md
                    z-10
                    `}
                >
                  <NavbarMobileLink
                    activeState={location.pathname !== "/members"}
                    title="Members"
                    slug="members"
                  />
                  <NavbarMobileLink
                    activeState={location.pathname !== "/inventory"}
                    title="Inventory"
                    slug="inventory"
                  />
                  <NavbarMobileLink
                    activeState={location.pathname !== "/parking"}
                    title="Parking"
                    slug="parking"
                  />
                  <NavbarMobileLink
                    activeState={location.pathname !== "/properties"}
                    title="Properties"
                    slug="property_info"
                  />
                  <NavbarMobileLink
                    activeState={location.pathname !== "/societyStaff"}
                    title="Society Staff"
                    slug="societyStaff"
                  />
                  <NavbarMobileLink
                    activeState={location.pathname === "/personalStaff"}
                    title="Personal Staff"
                    slug="personalStaff"
                  />
                  <NavbarMobileLink
                    activeState={location.pathname === "/funds"}
                    title="Funds"
                    slug="funds"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="
                py-2
                px-2
                font-medium
                text-white
                dark:text-gray-900
                bg-green-500
                rounded
                hover:bg-green-400
                transition
                duration-300
              "
            >
              Log in
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
        <NavbarMobileLink activeState={location.pathname !== "/"} />
        <NavbarMobileLink
          activeState={location.pathname !== "/maintenance"}
          title="Maintenance"
          slug="maintenance"
        />
        <NavbarMobileLink
          activeState={location.pathname !== "/transactions"}
          title="Transactions"
          slug="transactions"
        />
        <NavbarMobileLink
          activeState={location.pathname !== "/members"}
          title="Members"
          slug="members"
        />
        <NavbarMobileLink
          activeState={location.pathname !== "/inventory"}
          title="Inventory"
          slug="inventory"
        />
        <NavbarMobileLink
          activeState={location.pathname !== "/parking"}
          title="Parking"
          slug="parking"
        />
        <NavbarMobileLink
          activeState={location.pathname !== "/properties"}
          title="Properties"
          slug="property_info"
        />
        <NavbarMobileLink
          activeState={location.pathname !== "/societyStaff"}
          title="Society Staff"
          slug="societyStaff"
        />
        <NavbarMobileLink
          activeState={location.pathname === "/personalStaff"}
          title="Personal Staff"
          slug="personalStaff"
        />
        <NavbarMobileLink
          activeState={location.pathname !== "/funds"}
          title="Funds"
          slug="funds"
        />
      </div>
    </div>
  );
}

export default Navbar;
