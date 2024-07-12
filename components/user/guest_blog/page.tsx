"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import BounceLoader from "react-spinners/BounceLoader";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { Dialog, Transition } from "@headlessui/react";
import { db, storage } from "@/config/firebaseConfig";
interface AuthFormProps {
  signUpHandler?: (
    email: string,
    password: string,

    conformPassword: string
  ) => void;
  signInHandler?: (email: string, password: string) => void;
  signUp?: boolean;
  signIn?: boolean;
  open: boolean;
  setOpen: (d: boolean) => void;
}
const AuthModal: React.FC<AuthFormProps> = ({ open, setOpen }) => {
  const cancelButtonRef = useRef(null);
  // const modalCheck = useImageContext();
  // const FethUserImage = useImageContext();
  // const setUserImage = FethUserImage.userImageHandler;
  // const setModalCheck = modalCheck.authModalHandler;
  // const setSwitchModal = modalCheck.switchModalHandler;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bios, setBios] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDetail, setBlogDetail] = useState("");
  const [userData, setUserData] = useState<any>([]);
  const [error, setError] = useState(null);
  const [formStep, setFormStep] = useState(1);
  const [loader, setLoader] = useState<any>(false);
  const [thumbnailImage, setThumbnailImage] = useState<any>(null);
  const [file, setFile] = useState<any>(null);
  const [thumbnailImageURL, setThumbnailImageURL] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setThumbnailImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setThumbnailImageURL(reader?.result);
    };
    reader.readAsDataURL(file);
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setThumbnailImageURL(reader?.result);
    };
    reader.readAsDataURL(file);
  };
  // const [open, setOpen] = useState(false);
  //   const modal = modalCheck.authModal;
  const handleCloseModal = () => {
    setOpen(false);
    setError(null); // Reset error when closing modal
  };

  const handleNext = () => {
    if (name && email && bios) {
      setUserData((prev: any) => [...prev, { name, email, bios }]);
      setFormStep(2);
    }
  };
  const handleBack = () => {
    setFormStep(1);
  };
  // Create blog
  const createBlog = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setOpen(false);
    }, 7000);
    try {
      const newCollectionRef = collection(db, "guestBlogs");
      const storageRef = ref(storage, "images/" + thumbnailImage?.name);
      const titleSnapshot = await uploadBytes(storageRef, thumbnailImage);
      const titleImageUrl = await getDownloadURL(titleSnapshot.ref);
      const storageRefFile = ref(storage, "files/" + file?.name);
      const FileSnapshot = await uploadBytes(storageRefFile, file);
      const FileImageUrl = await getDownloadURL(FileSnapshot.ref);

      const newDocRef = doc(newCollectionRef);
      const userBlogData = {
        userDetail: { name, email, bios },
        blogDetail: {
          blogData: {
            blogTitle,
            blogDetail,
            thumbnail: titleImageUrl,
            contentFile: FileImageUrl,
          },
        },
      };
      await setDoc(newDocRef, userBlogData, { merge: true });

      // const getFileType = (fileName: any) => {
      //   const extension = fileName.split(".").pop().toLowerCase();
      //   switch (extension) {
      //     case "pdf":
      //       return "pdf";
      //     case "txt":
      //       return "txt";
      //     case "jpeg":
      //     case "jpg":
      //       return "jpeg";
      //     default:
      //       return "unknown";
      //   }
      // };

      const getFileType = (fileName: any) => {
        const extension = fileName.split(".").pop().toLowerCase();
        switch (extension) {
          case "pdf":
            return "pdf";
          case "txt":
            return "txt";
          case "jpeg":
          case "jpg":
            return "jpeg";
          case "ppt":
          case "pptx":
            return "ppt";
          case "doc":
          case "docx":
            return "docx";
          default:
            return "unknown";
        }
      };
      const fileType = getFileType(file.name);
      await addDoc(collection(db, "files"), {
        name: file.name,
        type: fileType,
        url: FileImageUrl,
      });
    } catch {
      console.error("Error adding data to Firestore:", error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
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
          <div className="flex min-h-full  items-center justify-center p-1 sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0  sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform   transition-all ">
                <div className="flex w-full h-full flex-col justify-center  text-black">
                  <div className="mx-auto w-full">
                    <div>
                      {open ? (
                        <div>
                          {/* //first form personal DETAILS */}
                          {formStep === 1 && (
                            <form>
                              <div className="relative">
                                <img
                                  src="/assets/publishedBlog/blog_bg.avif"
                                  className="rounded-lg"
                                />
                                <h1 className=" md:text-3xl sm:text-xl font-bold bg-gradient-to-r from-[#2474A6] to-white text-transparent bg-clip-text  absolute md:top-8 top-3 md:right-16 right-9">
                                  PERSONAL DETAILS
                                </h1>
                                <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  required
                                  placeholder="Enter Name Here"
                                  className=" border rounded-md md:py-1 px-3 md:w-72 sm:w-48 w-36 h-5 md:h-10  text-sm md:text-lg text-gray-700 absolute md:top-24 sm:top-14 top-10 md:right-8 right-5 bg-slate-200"
                                />
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                  placeholder="Enter Email Here"
                                  className=" border rounded-md  md:py-1 px-3 md:w-72 sm:w-48 w-36 h-5 md:h-10 text-sm md:text-lg text-gray-700 absolute md:top-36 sm:top-24 top-[68px] md:right-8 right-5 bg-slate-200"
                                />
                                <textarea
                                  id="bio"
                                  name="bio"
                                  value={bios}
                                  onChange={(e) => setBios(e.target.value)}
                                  required
                                  placeholder="Tell About Yourself"
                                  className="md:w-72 sm:w-48 w-36 border rounded-md md:py-2 px-3 h-10 md:h-20 text-sm md:text-lg text-gray-700  absolute md:top-48 sm:top-[135px] md:right-8 top-[96px] right-5 bg-slate-200"
                                ></textarea>
                                <div className="flex justify-between md:gap-28 sm:gap-24 gap-10 absolute  bottom-2 md:bottom-10   right-4   ">
                                  <button className="text-white md:text-xl text-md underline ">
                                    Skip
                                  </button>
                                  <button
                                    onClick={handleNext}
                                    className="bg-[#2474A6] text-white border hover:border-white  hover:text-[#2474A6] hover:bg-white md:py-2 sm:py-1 py-0 md:text-xl text-md md:px-8 px-4 mx-1 md:mx-5 rounded-md  transition duration-200 text-end "
                                  >
                                    Next
                                  </button>
                                </div>
                              </div>
                            </form>
                          )}
                          {/* // next page BLOG DETAILS */}
                          {formStep === 2 && (
                            <form onSubmit={createBlog}>
                              <div
                                className={`relative ${
                                  loader ? "opacity-50" : ""
                                }`}
                              >
                                <img
                                  src="/assets/publishedBlog/blog_bg.avif"
                                  className="rounded-lg w-[900px] opacity-70"
                                />
                                {/* loader */}

                                {loader && (
                                  <div className="opacity-loader absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5">
                                    <BounceLoader color="#00f" />
                                    <p className="text-black font-bold text-2xl">
                                      Posting Your Blog...
                                    </p>
                                  </div>
                                )}

                                <h1 className="lg:text-6xl md:text-5xl text-xl md:font-bold font-extrabold bg-gradient-to-r from-white to-[#2474A6] text-transparent bg-clip-text  absolute md:top-5 left-5 top-1 ">
                                  BLOG DETAILS
                                </h1>

                                <div className="mb-4 flex gap-2 items-center justify-around absolute lg:top-28 md:top-[72px] top-8">
                                  <label
                                    htmlFor="name"
                                    className="block text-gray-200 font-bold mb-2 md:w-40 w-20 md:text-2xl text-sm text-center"
                                  >
                                    Title :
                                  </label>
                                  <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={blogTitle}
                                    onChange={(e) =>
                                      setBlogTitle(e.target.value)
                                    }
                                    placeholder="Enter title here..."
                                    className=" border rounded-md md:py-2 px-1 md:w-[450px] w-44 text-sm md:text-2xl text-gray-700"
                                  />
                                </div>
                                <div className="mb-4 flex gap-2 items-center justify-around absolute lg:top-44 md:top-32 top-[59px]">
                                  <label
                                    htmlFor="name"
                                    className="block text-gray-200 font-bold mb-2 md:w-40 w-20 md:text-2xl text-sm text-center"
                                  >
                                    Image :
                                  </label>
                                  <input
                                    type="file"
                                    id="name"
                                    name="name"
                                    required
                                    onChange={handleImageChange}
                                    className="text-white rounded-md text-sm md:text-2xl"
                                  />
                                </div>
                                <div className="mb-4 flex gap-2 items-start justify-around absolute  lg:top-60 md:top-[169px] top-[90px] ">
                                  <label
                                    htmlFor="name"
                                    className="block text-gray-200 font-bold mb-2 md:w-40 w-20 md:text-2xl text-sm text-center"
                                  >
                                    Content File:
                                  </label>
                                  <input
                                    type="file"
                                    id="name"
                                    name="name"
                                    onChange={handleFileChange}
                                    className="text-white rounded-md text-sm md:text-2xl"
                                  />
                                </div>
                                {/* <div className="mb-4 flex gap-2 items-center justify-around absolute  lg:top-[270px] md:top-[189px] top-[140px]">
                                <label
                                  htmlFor="name"
                                  className="block text-gray-200  mb-2 md:w-40 w-20 text-2xl text-center"
                                >
                                  or
                                </label>
                              </div> */}
                                <div className="mb-4 flex gap-2 items-start justify-around absolute lg:bottom-14 md:bottom-[70px] bottom-[22px] ">
                                  <label
                                    htmlFor="name"
                                    className="block text-gray-200 font-bold mb-2  md:w-40 w-20 md:text-2xl text-sm text-center"
                                  >
                                    Content :
                                  </label>
                                  <textarea
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Content here..."
                                    value={blogDetail}
                                    onChange={(e) =>
                                      setBlogDetail(e.target.value)
                                    }
                                    className="lg:w-[700px] md:w-[550px]  w-44 md:h-[180px] h-9 p-1 rounded-md text-sm md:text-2xl"
                                  ></textarea>
                                </div>
                                <div className="flex justify-between lg:w-[800px] md:w-[650px] w-60 md:mx-20 mx-10  md:ml-10 ml-5 absolute  lg:bottom-2 md:bottom-6 bottom-2">
                                  <button
                                    onClick={handleBack}
                                    className="text-white md:text-xl text-sm underline "
                                  >
                                    Skip
                                  </button>
                                  <button className="bg-[#2474A6] text-white border hover:border-white  hover:text-[#2474A6] hover:bg-white md:py-2 md:text-xl text-sm md:px-8 px-4   rounded-md  transition duration-200 ">
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </form>
                          )}
                          {/* {formStep === 2 && (
                            <div className="relative flex justify-center items-center">
                              <img
                                src="/assets/publishedBlog/blog_bg.avif"
                                className="rounded-lg w-[900px] opacity-70"
                              />
                            </div>
                          )} */}
                        </div>
                      ) : null}
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

export default AuthModal;
