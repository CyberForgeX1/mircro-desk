"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { db } from "@/config/firebaseConfig";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
const NewsLetterFooter = () => {
  const [email, setEmail] = useState<any>();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setEmail("")
    try {
      const newCollectionRef = collection(db, "userNewsLetter");
      const newDocRef = doc(newCollectionRef);
      const userEmail = {
        email: email,
      };

      const result = await setDoc(newDocRef, userEmail, { merge: true });
      console.log("result--->", userEmail);
    } catch (error) {
      console.error("signup newslettererror--->", error);
    }
  };
  return (
    <div className=" flex bg-[#222222] flex-col justify-center gap-5 p-3  text-gray-300">
      <h4 className="text-2xl  md:text-4xl font-semibold ">
        Sign Up for Our Newsletter.
      </h4>
      <p className="text-lg text-gray-300 ">
        Stay Ahead, Stay Informed - Unlock a world of innovation delivered to
        your inbox.
      </p>
      <form
        onSubmit={submitHandler}
        className="flex  flex-wrap gap-1 items-center    pt-4"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-sky-100 focus:outline-none focus:ring focus:border-sky-950 text-black text-lg px-4 py-3 md:basis-1/2"
          placeholder="Enter Your Email"
        />
        <button
          type="submit"
          className="bg-sky-950 px-10 hover:bg-sky-700 py-3 md:basis-1/4 text-lg text-white font-semibold ml-5 "
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetterFooter;
