import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo/Sliken Logo-01.jpg";
import { FaShoppingCart } from "react-icons/fa";

import "./Navbar.css";
import Hamburger from "hamburger-react";
import useScrollDirection from "../../../Hook/UseScrollHook";
import { getCategories } from "../../../../ApiServices/ApiService";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

const Navbar = () => {
  //   const [showNavbar, setShowNavbar] = React.useState(false);
  const [showNavbar1, setShowNavbar1] = React.useState(false);
  const [isOpen, setOpen] = useState(false);
  const [womensSubCategory, setWomensSubCategory] = useState([]);
  const [mensSubCategory, setMensSubCategory] = useState([]);
  const [kidsSubCategory, setKidsSubCategory] = useState([]);
  let navigate = useNavigate();
  const scrollDirection = useScrollDirection();

  //   const handleShowNavbar = () => {
  //     setShowNavbar(!showNavbar);
  //   };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleShowNavbar1 = () => {
    setShowNavbar1(!showNavbar1);
  };

  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  useEffect(() => {
    // console.log("asdfasdf", getCategories(setWomensSubCategory, "winter"));
    getCategories(setMensSubCategory, "summer");
    getCategories(setKidsSubCategory, "eid");
  }, []);

  let handelCart = () => {
    navigate("/cart");
  };
  const product = useSelector((state) => state.reduxSlice.product);

  return (
    <div>
      <nav className="navbar fixed border-b border-[#eee]  h-[78px] b-10  top-0 z-[9999] w-full  bg-white text-black">
        <div className="container max-w-screen-2xl mx-auto flex gap-4 xl:gap-6 lg:justify-between items-center relative px-5 lg:px-20">
          {/* Company LOGO 1st part */}
          <div className="logo">
            <Link className=" " to="/">
              {" "}
              <img src={logo} alt="" className="w-[150px] py-5" />
            </Link>
          </div>
          {/* Hamburger for mobile Menu */}
          <div
            className="menu-icon border absolute right-8"
            onClick={handleShowNavbar}
          >
            <Hamburger />
          </div>

          {/* Manu 2nd part*/}
          <div className="flex justify-between ">
            <div
              className={`nav-elements z-50 uppercase ${
                showNavbar && "active"
              }`}
            >
              <ul className="flex  lg:items-center ">
                <li className=" lg:text-black hover:text-primary duration-300 underline-hover relative ">
                  <Link to={"/"} className="py-8 px-6">
                    Home
                  </Link>
                </li>

                <li className="relative group">
                  <button className=" flex items-center uppercase  ">
                    Shop
                    <Icon icon="mdi:arrow-down-drop" width={25} />
                  </button>

                  <ul className=" absolute hidden  bg-white top-10 left-0 max-w-[200px]  ">
                    <div className="flex flex-col">
                      <Link
                        to={{
                          pathname: `/${"winter"}`,
                          search: "?category=winter",
                        }}
                        className="content hover:text-white hover:bg-primary_hov px-8 py-2 capitalize"
                      >
                        winter
                      </Link>
                      <Link
                        to={{
                          pathname: `/${"summer"}`,
                          search: "?category=summer",
                        }}
                        className="content hover:text-white hover:bg-primary_hov px-8 py-2 capitalize"
                      >
                        {"summer"}
                      </Link>
                      <Link
                        to={{
                          pathname: `/${"eid"}`,
                          search: "?category=eid",
                        }}
                        className="content hover:text-white hover:bg-primary_hov px-8 py-2 capitalize"
                      >
                        {"eid"}
                      </Link>
                    </div>
                  </ul>
                </li>

                {/* <li className="dropdown relative">
                  <button className="rounded inline-flex items-center">
                    <span className="mr-1 text-black hover:text-primary duration-300 py-4">
                      Shop
                    </span>
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                    </svg>
                  </button>
                  <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                    <Link
                      to={{
                        pathname: `/${"winter"}`,
                        search: "?category=winter",
                      }}
                      className="hover:text-white hover:bg-primary_hov px-8 py-2"
                    >
                      winter
                    </Link>
                    <Link
                      to={{
                        pathname: `/${"summer"}`,
                        search: "?category=summer",
                      }}
                      className="hover:text-white hover:bg-primary_hov px-8 py-2"
                    >
                      {"summer"}
                    </Link>
                    <Link
                      to={{
                        pathname: `/${"eid"}`,
                        search: "?category=eid",
                      }}
                      className="hover:text-white hover:bg-primary_hov px-8 py-2"
                    >
                      {"eid"}
                    </Link>
                  </ul>
                </li> */}

                <li className="lg:text-black relative underline-hover hover:text-primary duration-300">
                  <Link to={"/about"} className="py-8 px-6">
                    About
                  </Link>
                </li>
                <li className="lg:text-black relative underline-hover hover:text-primary duration-300">
                  <Link to={"/contactUs"} className="py-8 px-6">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            {/* Side Bar */}
          </div>

          {/* 3rd part */}
          <div className="flex gap-10">
            <div
              onClick={handelCart}
              className=""
              // absolute top-[50%] translate-y-[-50%] md:right-16  right-28
            >
              <div className="relative">
                <FaShoppingCart size={25} />
                <div className=" bg-secondary w-[18px] text-center  text-white h-[18px] absolute top-[-10px] right-[-15px] z-10 rounded-full">
                  <p className="-mt-[2px]">{product.length}</p>
                </div>
              </div>
            </div>
            <div
              className="md:block hidden text-[#1b417f] hover:text-primary_hov  cursor-pointer   rounded"
              onClick={handleShowNavbar1}
              // absolute right-2
            >
              <Icon
                icon="mingcute:menu-fill"
                width={30}
                className="hover:scale-105 duration-300"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Side bar content */}
      <div className="transition ease-in-out delay-150 duration-700 z-[9999999]">
        <div
          className={`nav-elements-burger px-12 transition ease-in-out delay-150 duration-700 z-[999] h-[100vh] bg-gray-white  ${
            showNavbar1
              ? "active transition ease-in-out delay-150 duration-700 "
              : "hidden transition ease-in-out delay-150 duration-700"
          } `}
        >
          <div className="outer mt-[85px]" onClick={handleShowNavbar1}>
            <div className="inner">
              <label>Back</label>
            </div>
          </div>
          <div>
            <img src={logo} alt="" className="w-32" />
            <p className="py-10">
              Time to shop! Find your favorite product, check <br /> the latest
              collection & don’t miss out the best <br /> discounts with Onea!
            </p>

            <h1 className="text-2xl font-extrabold pb-10">#Instagram</h1>
          </div>
          <div>
            <h1 className="text-xl font-bold pb-5">Contact Us</h1>
            <div className="py-2">
              <a href="tel:01580799986">
                <p className="flex items-center gap-2 hover:scale-105 duration-300">
                  <Icon icon="ph:phone" /> 01580799986
                </p>
              </a>
            </div>
            <div className="py-2">
              <a href="mailto:info@muslin.com.bd">
                <p className="flex items-center gap-2 hover:scale-105 duration-300">
                  <Icon icon="lucide:messages-square" /> info@muslin.com.bd
                </p>
              </a>
            </div>
            <div>
              <a href="#">
                <p className="flex items-center gap-2 hover:scale-105 duration-300">
                  <Icon icon="material-symbols:home-work-outline" /> 55/8 Norh
                  Pirerbag 60 Feet, Mirpur-2, Dhaka, Bangladesh
                </p>
              </a>
            </div>

            <div className="flex justify-start mt-4 ">
              <a
                href="https://www.facebook.com/muslin.com.bd"
                type="button"
                className="m-1 leading-normal text-blue-700 hover:text-white uppercase transition duration-150 ease-in-out border-2 border-gray-300 rounded-full   hover:border-blue-700 hover:bg-blue-700 w-9 h-9"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="w-5 h-full mx-auto  bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                </svg>
              </a>

              {/* instagram */}
              <a
                href="https://www.instagram.com/muslin.com.bd"
                type="button"
                className="m-1 leading-normal text-[#8A41AA] hover:text-white uppercase transition duration-150 ease-in-out border-2 border-gray-300 rounded-full    hover:border-[#8A41AA] text-text-gray-50 hover:bg-[#8A41AA] w-9 h-9"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="w-5 h-full mx-auto"
                >
                  <path
                    fill="currentColor"
                    d="M13.028 2.001a78.82 78.82 0 0 1 2.189.022l.194.007c.224.008.445.018.712.03c1.064.05 1.79.218 2.427.465c.66.254 1.216.598 1.772 1.154a4.908 4.908 0 0 1 1.153 1.771c.247.637.415 1.364.465 2.428c.012.266.022.488.03.712l.006.194a79 79 0 0 1 .023 2.188l.001.746v1.31a78.836 78.836 0 0 1-.023 2.189l-.006.194c-.008.224-.018.445-.03.712c-.05 1.064-.22 1.79-.466 2.427a4.884 4.884 0 0 1-1.153 1.772a4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465c-.267.012-.488.022-.712.03l-.194.006a79 79 0 0 1-2.189.023l-.746.001h-1.309a78.836 78.836 0 0 1-2.189-.023l-.194-.006a60.64 60.64 0 0 1-.712-.03c-1.064-.05-1.79-.22-2.428-.466a4.89 4.89 0 0 1-1.771-1.153a4.904 4.904 0 0 1-1.154-1.772c-.247-.637-.415-1.363-.465-2.427a74.367 74.367 0 0 1-.03-.712l-.005-.194A79.053 79.053 0 0 1 2 13.028v-2.056a78.82 78.82 0 0 1 .022-2.188l.007-.194c.008-.224.018-.446.03-.712c.05-1.065.218-1.79.465-2.428A4.88 4.88 0 0 1 3.68 3.68a4.897 4.897 0 0 1 1.77-1.155c.638-.247 1.363-.415 2.428-.465l.712-.03l.194-.005A79.053 79.053 0 0 1 10.972 2h2.056Zm-1.028 5A5 5 0 1 0 12 17a5 5 0 0 0 0-10Zm0 2A3 3 0 1 1 12.001 15a3 3 0 0 1 0-6Zm5.25-3.5a1.25 1.25 0 0 0 0 2.498a1.25 1.25 0 0 0 0-2.5Z"
                  />
                </svg>
              </a>

              {/* Youtube */}
              <a
                href="https://www.youtube.com/@Muslin.fashion"
                type="button"
                className="m-1 leading-normal text-[#CD201F] hover:text-white uppercase transition duration-150 ease-in-out border-2 border-gray-300 rounded-full  hover:border-[#CD201F] hover:bg-[#CD201F] w-9 h-9"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="w-5 h-full mx-auto  bi bi-linkedin"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                    <path
                      fill="currentColor"
                      d="M12 4c.855 0 1.732.022 2.582.058l1.004.048l.961.057l.9.061l.822.064a3.802 3.802 0 0 1 3.494 3.423l.04.425l.075.91c.07.943.122 1.971.122 2.954c0 .983-.052 2.011-.122 2.954l-.075.91c-.013.146-.026.287-.04.425a3.802 3.802 0 0 1-3.495 3.423l-.82.063l-.9.062l-.962.057l-1.004.048A61.59 61.59 0 0 1 12 20a61.59 61.59 0 0 1-2.582-.058l-1.004-.048l-.961-.057l-.9-.062l-.822-.063a3.802 3.802 0 0 1-3.494-3.423l-.04-.425l-.075-.91A40.662 40.662 0 0 1 2 12c0-.983.052-2.011.122-2.954l.075-.91c.013-.146.026-.287.04-.425A3.802 3.802 0 0 1 5.73 4.288l.821-.064l.9-.061l.962-.057l1.004-.048A61.676 61.676 0 0 1 12 4Zm-2 5.575v4.85c0 .462.5.75.9.52l4.2-2.425a.6.6 0 0 0 0-1.04l-4.2-2.424a.6.6 0 0 0-.9.52Z"
                    />
                  </g>
                </svg>
              </a>

              {/* Whatsapp  */}

              <a
                href="https://wa.me/8801580799986?text=Hello%20Muslin"
                type="button"
                className="m-1 leading-normal text-[#24CC63] hover:text-white uppercase transition duration-150 ease-in-out border-2 border-gray-300 rounded-full    hover:border-[#24CC63] hover:bg-[#24CC63] w-9 h-9"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="w-[22px] h-full mx-auto  bi bi-linkedin"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                    <path
                      fill="currentColor"
                      d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.546 20.2A1.01 1.01 0 0 0 3.8 21.454l3.032-.892A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2ZM9.738 14.263c2.023 2.022 3.954 2.289 4.636 2.314c1.037.038 2.047-.754 2.44-1.673a.696.696 0 0 0-.088-.703c-.548-.7-1.289-1.203-2.013-1.703a.711.711 0 0 0-.973.158l-.6.915a.229.229 0 0 1-.305.076c-.407-.233-1-.629-1.426-1.055c-.426-.426-.798-.992-1.007-1.373a.227.227 0 0 1 .067-.291l.924-.686a.712.712 0 0 0 .12-.94c-.448-.656-.97-1.49-1.727-2.043a.695.695 0 0 0-.684-.075c-.92.394-1.716 1.404-1.678 2.443c.025.682.292 2.613 2.314 4.636Z"
                    />
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
