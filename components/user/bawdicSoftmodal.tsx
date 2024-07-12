"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { db } from "@/config/firebaseConfig";
import {
  collection,
  disablePersistentCacheIndexAutoCreation,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
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
  authModal: boolean;
  setAuthModal: (bool: boolean) => void;
}
const AuthForm: React.FC<AuthFormProps> = ({ authModal, setAuthModal }) => {
  const cancelButtonRef = useRef(null);
  const emailRef = useRef<any>();
  const nameRef = useRef<any>();
  const companyRef = useRef<any>();
  const countryRef = useRef<any>();
  const stateRef = useRef<any>();
  const queryRef = useRef<any>();
  const [role, setRole] = useState("");
  // const modalCheck = useImageContext();
  // const FethUserImage = useImageContext();
  // const setUserImage = FethUserImage.userImageHandler;
  // const setModalCheck = modalCheck.authModalHandler;
  // const setSwitchModal = modalCheck.switchModalHandler;
  // const modal = modalCheck.authModal;

  // const submitHandler = (e: any) => {
  //   e.preventDefault();
  //   const email = emailRef.current.value;
  //   const password = passwordRef.current.value;
  //   if (signUp && signUpHandler !== undefined) {
  //     const conformPassword = conformPasswordRef.current.value;
  //     signUpHandler(email, password, conformPassword);
  //   }

  //   if (signIn && signInHandler !== undefined) {
  //     signInHandler(email, password);
  //   }
  // };
  // const provider = new GoogleAuthProvider();
  // const signInWithGoogle = async () => {
  //   try {
  //     const { user } = await signInWithPopup(auth, provider);
  //     console.log("user---->", user);
  //     console.log("userNameGoogle---->", user);
  //     if (user) {
  //       setModalCheck(false);
  //     }
  //     setUserImage(user?.photoURL ?? user?.displayName?.slice(0, 8) ?? "");
  //     localStorage.setItem("user", JSON.stringify(user));
  //   } catch (error) {
  //     console.error("Sign-in error:", error);
  //   }
  // };

  // const signInWithFacebook = async () => {
  //   const providerFaceBook = new FacebookAuthProvider();
  //   signInWithPopup(auth, providerFaceBook)
  //     .then((result) => console.log("resultFaceBook---->", result))
  //     .catch((error) => console.log("errorFaceBook-->", error));
  // };
  // const signInWithTwitter = async () => {
  //   const providerTwitter = new TwitterAuthProvider();
  //   try {
  //     signInWithPopup(auth, providerTwitter)
  //       .then((result) => {
  //         if (result.user) {
  //           setModalCheck(false);
  //         }
  //         setUserImage(
  //           result.user?.photoURL ?? result.user?.displayName?.slice(0, 8) ?? ""
  //         );
  //         localStorage.setItem("user", JSON.stringify(result.user.displayName));
  //       })
  //       .catch((error) => console.log("errorFTwitter->", error));
  //   } catch (error) {
  //     console.error("Sign-in error:", error);
  //   }
  // };
  const modalHandler = () => {
    setAuthModal(!authModal);
  };
  const submitHandler = async (e: any) => {
    e.preventDefault();
    const email = emailRef?.current?.value;
    const name = nameRef?.current?.value;
    const company = companyRef?.current?.value;
    const country = countryRef?.current?.value;
    const state = stateRef?.current?.value;
    const query = queryRef?.current?.value;
    try {
      const newCollectionRef = collection(db, "referenceUsersBawdicSoft");
      const newDocRef = doc(newCollectionRef);
      const userData = {
        name,
        email,
        company,
        country,
        state,
        role,
        query,
      };

      await setDoc(newDocRef, userData, { merge: true });
      console.log("result--->", userData);
      if (userData !== undefined) {
        setAuthModal(!authModal);
      }
    } catch (error) {
      console.error("signup newslettererror--->", error);
    }
  };
  return (
    <Transition.Root show={authModal} as={Fragment}>
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
          <div className="fixed inset-0 bg-black backdrop-blur-lg bg-opacity-30 bg-blend-multiply  transition-opacity" />
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
              <Dialog.Panel className="relative  transform rounded-lg bg-white w-96 p-5 pb-6 shadow-xl transition-all  ">
                <div className="flex w-full h-full flex-col justify-center text-black">
                  <div className="rounded-xl">
                    <form onSubmit={submitHandler} className="space-y-6 ">
                      <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-600 ">
                        Hi ! Ask Your Query
                      </h2>

                      <input
                        id="Name"
                        name="Name"
                        type="text"
                        ref={nameRef}
                        autoComplete="Name"
                        placeholder="Name..."
                        required
                        className="block w-full rounded-md border border-green py-1.5 px-2 text-gray-900 shadow-sm  ring-inset ring-sky-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-text-green outline-none sm:text-sm sm:leading-6"
                      />
                      <input
                        id="Email"
                        name="Email"
                        type="email"
                        ref={emailRef}
                        autoComplete="Email"
                        placeholder="Email..."
                        required
                        className="block w-full rounded-md border border-green py-1.5 px-2 text-gray-900 shadow-sm  ring-inset ring-sky-500 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-text-green sm:text-sm sm:leading-6"
                      />

                      <select
                        onChange={(e: any) => {
                          setRole(e.target.value);
                        }}
                        className="block w-full rounded-md border border-green py-1.5 px-2 text-gray-900 shadow-sm  ring-inset ring-sky-500 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-text-green sm:text-sm sm:leading-6"
                      >
                        <option>Roles</option>
                        <option>Admin</option>
                        <option>User</option>
                        <option>Guest</option>
                        <option>Developer</option>
                      </select>
                      <input
                        id="Company"
                        name="Company"
                        type="text"
                        ref={companyRef}
                        autoComplete="Company"
                        placeholder="Company"
                        required
                        className="block w-full rounded-md border border-green py-1.5 px-2 text-gray-900 shadow-sm  ring-inset ring-sky-500 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-text-green sm:text-sm sm:leading-6"
                      />

                      <input
                        id="Country"
                        name="Country"
                        type="text"
                        ref={countryRef}
                        autoComplete="Country"
                        placeholder="Country"
                        required
                        className="block w-full rounded-md border border-green py-1.5 px-2 text-gray-900 shadow-sm  ring-inset ring-sky-500 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-text-green sm:text-sm sm:leading-6"
                      />

                      <input
                        id="State"
                        name="State"
                        type="text"
                        ref={stateRef}
                        autoComplete="State"
                        placeholder="State"
                        required
                        className="block w-full rounded-md border border-green py-1.5 px-2 text-gray-900 shadow-sm  ring-inset ring-sky-500 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-text-green sm:text-sm sm:leading-6"
                      />
                      <input
                        id="Query"
                        name="Query"
                        type="text"
                        ref={queryRef}
                        autoComplete="Query"
                        placeholder="Enter Your Query"
                        required
                        className="block w-full rounded-md border border-green py-1.5 px-2 text-gray-900 shadow-sm  ring-inset ring-sky-500 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-text-green sm:text-sm sm:leading-6"
                      />

                      <button
                        type="submit"
                        className="flex w-full mx-auto justify-center  text-white border rounded-3xl  bg-[#066db5] hover:bg-[#3197df] px-3 py-1.5 text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-green"
                      >
                        Submit
                      </button>
                    </form>
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

export default AuthForm;
