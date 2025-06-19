import ticketlogo from "../../assets/ticketlogo.png";
import { FiSearch } from "react-icons/fi";
import { CgMenuGridO } from "react-icons/cg";
import HeaderDrawer from "./HeaderDrawer";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { initFlowbite } from "flowbite";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(null);
  // const {user} =  useContext(UserContext);
  const { userProfile, authStatus } = useSelector((state) => state.user);

  // console.log("navbar", authStatus, userProfile);

  useEffect(() => {
    if (authStatus) {
      initFlowbite();
    }
  }, [authStatus]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={` z-[999] fixed w-full px-4 lg:px-0 py-4 md:py-3 top-0 start-0 ${
        scrolled &&
        "bg-blue/80 backdrop-blur-md transition-all duration-500 ease-in-out"
      }`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={ticketlogo}
            alt="app logo"
            className="w-7 md:w-8 rotate-90"
            loading="lazy"
          />
          <span className="self-center text-white text-2xl font-semibold whitespace-nowrap ">
            Cinemagic
          </span>
        </NavLink>
        {/* <div className="flex space-x-3 md:space-x-0"> */}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        {/* </div> */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 bg-white md:bg-transparent">
            <li>
              <NavLink
                to={'/'}
                className="block py-2 px-3 text-black md:text-white "
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            {authStatus !== null && !authStatus ? (
              
                <li>
                  <NavLink
                    to={"/authentication"}
                    className="block py-2 px-3 text-black md:text-white "
                  >
                    Login/Signup
                  </NavLink>
                </li>
            ) : (
              <>
                  <li>
                    <NavLink
                      to={"/profile/allreservations"}
                      className="block py-2 px-3 text-black md:text-white "
                    >
                      Your Ticket(s)
                    </NavLink>
                  </li>
                <li>
                  <NavLink
                    to={'#'}
                    className="block py-2 px-3 text-black md:text-white "
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
