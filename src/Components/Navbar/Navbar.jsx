/* eslint-disable react/prop-types */
import React from "react";
import { Collapse, IconButton } from "@material-tailwind/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

function NavList() {
  const CustomLink = ({ to, label }) => {
    const location = useLocation();

    return (
      <Link
        to={to}
        className={`${
          location.pathname === to
            ? "active-link"
            : "p-3 hover:bg-gray-400 hover:text-white rounded-lg transition-all"
        } font-bold`}
      >
        {label}
      </Link>
    );
  };

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8 lg:mr-10">
      <CustomLink to="/" label="Register Your Restaurant" />
      <CustomLink to="/login" label="Login" />
    </ul>
  );
}

export function NavbarMain() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="sticky top-0 z-10 shadow-xl">
      <div className="w-full rounded-none p-3 bg-[#F0EDD4]">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to="/">
            <img
              src="https://i.ibb.co/kBDBhVs/dinedash.png"
              className="w-[80px] ml-10"
            />
          </Link>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <IoMdClose className="h-6 w-6" strokeWidth={2} />
            ) : (
              <RxHamburgerMenu className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
        </Collapse>
      </div>
    </div>
  );
}
