"use client";
import { BlogPost } from "@/helpers/types/types";
import { createContext } from "react";

interface MyContextValue {
  blogData: Array<BlogPost>;
  loading: boolean;
  signInWithGoogle: () => void;
  signOut: () => void;
  signInWithFb: () => void;
  user: any;
}

const MyContext = createContext<MyContextValue | null>(null);

export default MyContext;
