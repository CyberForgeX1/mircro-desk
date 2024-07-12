"use client";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import MyContext from "@/context/createContext";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import Sidebar from "./sidebar";
import Image from "next/image";
import Link from "next/link";
import NewsLetterModal from "../NewsLetterModal";
import AuthModal from "../guest_blog/page";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Latest", href: "/latest" },
  { name: "AI", href: "/ai" },
  { name: "Blockchain", href: "/blockchain" },
  { name: "Web Dev", href: "/web-development" },
  { name: "Tutorial", href: "/tutorial" },
];

export default function Navbar() {
  const { signInWithGoogle, signOut, user }: any = useContext(MyContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <NewsLetterModal />
      <header className="flex flex-col justify-between">
        {/* <div className=" pt-4 text-center lg:flex hidden">
          <div className="relative w-20 h-20">
            <Image
              className="ml-4"
              layout="fill"
              objectFit="contain"
              src="/assets/logo/logo.png"
              alt="logo"
            />
          </div>
          <Link
            href="/"
            className="w-full font-bold text-3xl pt-2.5 text-[#2474A6] uppercase"
          >
            Mircrodesk
          </Link>
        </div> */}
        <div className=" pt-4 text-center lg:flex justify-center  hidden">
          <div className="relative w-[66px] h-[66px]">
            <Image
              layout="fill"
              objectFit="contain"
              src="/assets/logo/logo.png"
              alt="logo"
            />
          </div>
          <Link href="/" className="font-bold text-4xl pt-2 text-[#2474A6]">
            MircroDesk
          </Link>
        </div>
        <nav
          className="flex mt-6 items-center justify-between px-3 lg:px-8 lg:border-b"
          aria-label="Global"
        >
          <div className="lg:block hidden">
            <div className={`${pathname === "/search" ? "text-gray-600" : ""}`}>
              <Link href={"/search"} className="flex items-center gap-2">
                <h4>Search</h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="lg:hidden ">
            <h1 className="font-extrabold text-3xl md:text-4xl text-[#2474A6] uppercase">
              mircrodesk
            </h1>
          </div>
          <div className="hidden lg:flex lg:gap-x-2 uppercase py-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                className={`text-sm font-semibold hover:text-[#2474A6] leading-6 text-gray-900 px-4 ${
                  pathname === item.href
                    ? "bg-[#2474A6] text-white hover:text-white"
                    : ""
                }`}
              >
                <span className="tracking-[0.10rem]">{item.name}</span>
              </Link>
            ))}

            {/* {session ? (
              <button onClick={() => signOut()}>Sign out</button>
              ) : (
                <button onClick={() => signIn()}>Sign in</button>
              )} */}
          </div>
          <button
            onClick={() => setOpen(true)}
            className="bg-[#2474A6] hidden md:block my-1 font-semibold text-white border hover:border-[#2474A6] px-2  md:px-5 py-1 hover:text-[#2474A6] hover:bg-white"
          >
            Try as a Guest
          </button>
          {<AuthModal open={open} setOpen={setOpen} />}
          <button
            type="button"
            className="inline-flex items-center outline-none justify-center rounded-md text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <HiMiniBars3CenterLeft className="text-3xl" />
            <span className="sr-only">Open main menu</span>
          </button>
        </nav>
      </header>
      {/* Mobile Screen */}
      <Sidebar open={mobileMenuOpen} setOpen={setMobileMenuOpen}>
        <div className="bg-white h-screen overflow-auto">
          <div className="border-b mb-5 pb-3 lg:hidden">
            <div className="flex justify-between items-center mx-3 mt-5">
              <div>
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="font-extrabold text-3xl text-[#2474A6] uppercase"
                >
                  Mircrodesk
                </Link>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 cursor-pointer text-gray-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <div className="lg:block hidden">
            <div className="flex justify-end mx-5 mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 cursor-pointer text-gray-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <div className="w-[80%] lg:hidden mx-auto ">
            <form>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-3 pl-10 text-sm text-gray-900 border outline-none border-gray-300 bg-gray-50"
                  placeholder="Search"
                  required
                />
              </div>
            </form>
          </div>
          <div>
            <h1 className="pl-5 pt-5 text-[#2474A6] font-extrabold text-2xl">
              Discover
            </h1>
            <div className="mx-10 pt-5">
              {navigation.map((values, index) => (
                <Link
                  key={index}
                  href={values.href}
                  onClick={closeMobileMenu}
                  className={`flex hover:text-[#2474A6] ${
                    index !== navigation.length - 1
                      ? "border-b pb-2 mb-5"
                      : "border-b pb-2 mb-5"
                  }`}
                >
                  {values.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-between gap-1 mx-10">
              {user ? (
                <div className="flex justify-between w-full">
                  <div className="flex">
                    <Image
                      width={28}
                      height={28}
                      className="rounded-full"
                      src={user?.photoURL}
                      alt="user-profile-pic"
                    />
                    <p className="pl-2 font-semibold">{user?.displayName}</p>
                  </div>

                  <button
                    onClick={signOut}
                    className="relative inline-flex items-center justify-center px-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-red-500 rounded-full shadow-md group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-500 group-hover:translate-x-0 ease">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-red-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                      Logout
                    </span>
                    <span className="relative invisible">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="text-whiten w-full bg-[#2474A6] hover:bg-[#2474A6]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center text-white mb-2"
                >
                  <svg
                    className="w-4 h-4 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 19"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sign in with Google
                </button>
              )}
            </div>
            <hr className="h-[2px] bg-gray-200 w-full mt-2" />
            <div className="flex justify-center py-3">
              <button
                onClick={() => setOpen(true)}
                className="bg-[#2474A6] my-1 font-semibold text-white border hover:border-[#2474A6] px-5 py-2 hover:text-[#2474A6] hover:bg-white"
              >
                Try as a Guest
              </button>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
}
