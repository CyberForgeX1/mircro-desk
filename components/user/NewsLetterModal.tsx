// import { useState } from "react";

// const NewsLetterModal = () => {
//     const [newsLetterModal , setNewsLetterModal] = useState(true)
//   return (
//     <div className="text-center">
//       <div className="absolute left-72 top-20 py-10 shadow-2xl flex bg-white  max-w-7xl mx-5 rounded-3xl flex-col  justify-center gap-2 items-center">
//         <button onClick={()=>setNewsLetterModal(!newsLetterModal)}>****</button>
//         <h4 className="text-2xl  md:text-3xl font-semibold text-center">
//           Sing Up for Our Newsletter.
//         </h4>
//         <p className="text-gray-800 text-center">
//           Stay Ahead, Stay Informed - Unlock a world of innovation delivered to
//           your inbox.
//         </p>
//         <form className="flex justify-center flex-wrap gap-2 items-center  md:gap-0  md:w-[700px] pt-4">
//           <input
//             type="email"
//             className="bg-sky-100 focus:outline-none focus:ring focus:border-sky-950  rounded-3xl p-4 py-4 md:basis-1/2"
//             placeholder="Enter Your Email"
//           />
//           <button
//             type="submit"
//             className="bg-sky-950 px-16 hover:bg-sky-700 py-4 md:basis-1/4 text-white font-semibold ml-5 rounded-3xl"
//           >
//             Subscribe
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NewsLetterModal;
"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { db } from "@/config/firebaseConfig";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  getRedirectResult,
  TwitterAuthProvider,
} from "firebase/auth";
// import { auth } from "@/app/firebase";
import { Dialog, Transition } from "@headlessui/react";
// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
// import { useImageContext } from "../contextApi/imageContext";
import { FcGoogle } from "react-icons/fc";
import { TfiFacebook } from "react-icons/tfi";
import { GrTwitter } from "react-icons/gr";
import Link from "next/link";

interface AuthFormProps {
  signUpHandler?: (
    email: string,
    password: string,

    conformPassword: string
  ) => void;
  signInHandler?: (email: string, password: string) => void;
  signUp?: boolean;
  signIn?: boolean;
}
const NewsLetterModal: React.FC<AuthFormProps> = (
  {
    //   signUp,
    //   signIn,
    //   signUpHandler,
    //   signInHandler,
  }
) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  //   const emailRef = useRef<any>();
  //   const passwordRef = useRef<any>();
  //   const conformPasswordRef = useRef<any>();
  //   const modalCheck = useImageContext();
  //   const FethUserImage = useImageContext();
  //   const setUserImage = FethUserImage.userImageHandler;
  //   const setModalCheck = modalCheck.authModalHandler;
  //   const setSwitchModal = modalCheck.switchModalHandler;
  //   const modal = modalCheck.authModal;

  //   const submitHandler = (e: any) => {
  //     e.preventDefault();
  //     const email = emailRef.current.value;
  //     const password = passwordRef.current.value;
  //     if (signUp && signUpHandler !== undefined) {
  //       const conformPassword = conformPasswordRef.current.value;
  //       signUpHandler(email, password, conformPassword);
  //     }

  //     if (signIn && signInHandler !== undefined) {
  //       signInHandler(email, password);
  //     }
  //   };
  //   const provider = new GoogleAuthProvider();
  //   const signInWithGoogle = async () => {
  //     try {
  //       const { user } = await signInWithPopup(auth, provider);
  //       console.log("user---->", user);
  //       console.log("userNameGoogle---->", user);
  //       if (user) {
  //         setModalCheck(false);
  //       }
  //       setUserImage(user?.photoURL ?? user?.displayName?.slice(0, 8) ?? "");
  //       localStorage.setItem("user", JSON.stringify(user));
  //       // console.log("provider---->", provider);
  //     } catch (error) {
  //       console.error("Sign-in error:", error);
  //     }
  //   };

  //   const signInWithFacebook = async () => {
  //     const providerFaceBook = new FacebookAuthProvider();
  //     signInWithPopup(auth, providerFaceBook)
  //       .then((result) => console.log("resultFaceBook---->", result))
  //       .catch((error) => console.log("errorFaceBook-->", error));
  //   };
  //   const signInWithTwitter = async () => {
  //     const providerTwitter = new TwitterAuthProvider();
  //     try {
  //       signInWithPopup(auth, providerTwitter)
  //         .then((result) => {
  //           if (result.user) {
  //             setModalCheck(false);
  //           }
  //           setUserImage(
  //             result.user?.photoURL ?? result.user?.displayName?.slice(0, 8) ?? ""
  //           );
  //           localStorage.setItem("user", JSON.stringify(result.user.displayName));
  //         })
  //         .catch((error) => console.log("errorFTwitter->", error));
  //     } catch (error) {
  //       console.error("Sign-in error:", error);
  //     }
  //   };
  const modalHandler = () => {
    setOpen(!open);
  };
  const emailRef = useRef<any>();
  const submitHandler = async (e: any) => {
    e.preventDefault();
    const email = emailRef?.current?.value;
    try {
      const newCollectionRef = collection(db, "userNewsLetter");
      const newDocRef = doc(newCollectionRef);
      const userEmail = {
        email: email,
      };

      const result = await setDoc(newDocRef, userEmail, { merge: true });
      console.log("result--->", userEmail);
      if (userEmail !== undefined) {
        setOpen(!open);
      }
    } catch (error) {
      console.error("signup newslettererror--->", error);
    }
  };
  useEffect(() => {
    setTimeout(() => setOpen(true), 15000);
  }, []);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={modalHandler}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-green backdrop-blur-lg bg-opacity-30 bg-blend-multiply  transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full  justify-center p-4 items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0  sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative  transform rounded-lg bg-lightGreen  shadow-xl transition-all  ">
                <div className="flex w-full h-full flex-col justify-center text-black">
                  <div className="border  border-green rounded-xl ">
                    {/* <form className="space-y-6 ">
                      <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-white ">
                        {signUp
                          ? "Sign Up Your Account!"
                          : "Sign in to Your Account!"}
                      </h2>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        ref={emailRef}
                        autoComplete="email"
                        placeholder="email..."
                        required
                        className="block w-full rounded-md border border-green py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-text-green sm:text-sm sm:leading-6"
                      />

                      <input
                        id="Password"
                        name="Password"
                        type="Password"
                        ref={passwordRef}
                        autoComplete="Password"
                        placeholder="password"
                        required
                        className="block w-full rounded-md border border-green py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-text-green sm:text-sm sm:leading-6"
                      />

                      {signUp && (
                        <input
                          id="conformPassword"
                          name="conformPassword"
                          type="password"
                          ref={conformPasswordRef}
                          autoComplete="conformPassword"
                          placeholder="Conform Password"
                          required
                          className="block w-full rounded-md border border-green py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-text-green sm:text-sm sm:leading-6"
                        />
                      )}

                      <button
                        type="submit"
                        className="flex w-full mx-auto justify-center rounded-3xl  bg-lightGreen px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-green"
                      >
                        {signUp ? " Sign up" : "Sign in"}
                      </button>
                      <button
                        type="submit"
                        className="flex gap-1  md:gap-3 items-center w-full justify-center uppercase rounded-md border bg-lightGreen  md:px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-green"
                        onClick={signInWithFacebook}
                      >
                        <TfiFacebook className=" ml-5 w-5 h-5 md:w-6 md:h-6 text-gray-700" />{" "}
                        <span className="">CONTINUE WITH FACEBOOK</span>
                      </button>

                      <button
                        onClick={signInWithGoogle}
                        type="submit"
                        className="flex gap-1  md:gap-2 w-full justify-center items-center rounded-md md:px-3 border bg-lightGreen  py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-green"
                     
                      >
                        <FcGoogle className="w-5 h-5 mr-2  md:w-6 md:h-6" />{" "}
                        <span className="">CONTINUE WITH GOOGLE</span>
                      </button>

                      <button
                        onClick={signInWithTwitter}
                        type="submit"
                        className="flex gap-1  md:gap-2 items-center w-full justify-center uppercase rounded-md border bg-lightGreen  md:px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-green"
                       
                      >
                        <GrTwitter className=" w-5 h-5 mr-1 md:w-6 md:h-6 text-gray-700" />{" "}
                        <span className="">CONTINUE WITH TWITTER</span>
                      </button>
                    </form>
                    {!signUp ? (
                      <p className="mt-10 text-center text-sm text-white">
                        Don&#39;t have an Account?
                        <Link
                          onClick={() => setSwitchModal("signup")}
                          href="#"
                          className="uppercase font-semibold leading-6  hover:text-lightGreen underline"
                        >
                          Signup
                        </Link>
                      </p>
                    ) : (
                      <p className="mt-10 text-center text-sm text-white">
                        Already have an Account?
                        <Link
                          onClick={() => setSwitchModal("signin")}
                          href="#"
                          className="font-semibold leading-6  hover:text-lightGreen underline"
                        >
                          LOGIN
                        </Link>
                      </p>
                    )} */}

                    <div className="">
                      <div className=" py-5 md:py-10 shadow-2xl flex bg-white  max-w-7xl  rounded-xl flex-col  justify-center gap-2 items-center">
                        <h4 className="text-2xl  md:text-3xl font-semibold text-center">
                          Sign Up for Our Newsletter.
                        </h4>
                        <p className="text-gray-800 text-sm md:text-base px-3 text-center">
                          Stay Ahead, Stay Informed - Unlock a world of
                          innovation delivered to your inbox.
                        </p>
                        <form
                          onSubmit={submitHandler}
                          className="flex flex-wrap justify-center gap-2 items-center p-1"
                        >
                          <input
                            type="email"
                            ref={emailRef}
                            required
                            className="bg-sky-100 focus:outline-none focus:ring focus:border-sky-950 rounded-3xl w-60 md:w-80 px-5 py-2 md:py-4 md:basis-1/2"
                            placeholder="Enter Your Email"
                          />
                          <button
                            type="submit"
                            className="bg-sky-950 px-8 hover:bg-sky-700 py-2 md:py-4 md:basis-1/4 text-white font-semibold ml-5 rounded-3xl"
                          >
                            Subscribe
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NewsLetterModal;
