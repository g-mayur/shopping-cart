import React from "react";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import StoreLogo from "../images/store-logo.png";

const Navbar = () => {
  const { cart } = useSelector((state) => state);
  return (
    <>
      <nav className="flex items-center justify-between max-w-full mx-auto bg-blue-100 p-3">
        <Link to={"/"}>
          <div className="ml-5">
            <img src={StoreLogo} alt="Store Logo" className="w-44" />
          </div>
        </Link>
        <div className="flex list-none items-center space-x-6 mr-5 text-gray-700 -tracking-tighterr font-semibold">
          <Link to={"/cart"}>
            <div className="relative">
              <LocalMallIcon fontSize="large" className="cursor-pointer"/>
              {cart.length >= 0 && (
                <div className="absolute bg-orange-500 text-xs w-5 h-5 flex justify-center items-center animate-bounce -top-1 -right-2 rounded-full top- text-white">
                  {cart.length}
                </div>
              )}
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
