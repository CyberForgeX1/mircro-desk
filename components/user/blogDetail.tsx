import { useContext, useState } from "react";

import { BlogDetailSkeleton } from "../../utils/loadingSkeleton";
import { formatDateAndTime } from "@/utils/dateTime";
import CopyToClipboardButton from "@/utils/copyToClipboard";
import MyContext from "@/context/createContext";
import ShareButtons from "./shareBlog/button";
import CommentsSection from "./comments";
import Likes from "./comments/likes";
import Modal from "./model/model";
import Link from "next/link";
import AuthForm from "./bawdicSoftmodal";

interface Prop {
  blogData: any;
  loading: any;
  setSingleBlogData: any;
}

const BlogDetail = ({ blogData, setSingleBlogData, loading }: Prop) => {
  const [showComments, setShowComments] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [authModal, setAuthModal] = useState<boolean>(false);
  const { signInWithGoogle, user }: any = useContext(MyContext);

  if (loading) {
    return <BlogDetailSkeleton />;
  }

  return (
    <>
      {!user && (
        <Modal open={open} setOpen={setOpen}>
          <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 ">
            <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl ">
              Create an account
            </h5>
            <p className="text-sm font-normal ">
              Create your account to get full access and interact with our
              community.
            </p>
            <ul className="my-4 space-y-3">
              <li>
                <button
                  onClick={signInWithGoogle}
                  className="flex w-full items-center p-3 text-base rounded-lg group hover:shadow bg-[#2474A6] hover:bg-[#2474A6]/90 text-white"
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
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Sign in with Google
                  </span>
                </button>
              </li>
            </ul>
            <div>
              <a
                href="#"
                className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline"
              >
                <svg
                  className="w-3 h-3 me-2"
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
                    d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Why do I need to create an account?
              </a>
            </div>
          </div>
        </Modal>
      )}
      <section className="max-w-7xl lg:mx-auto mx-5">
        <div className="flex items-center pt-2">
          <div className="border-t-[3px] border-[#2474A6] flex-auto"></div>
          <div>
            <h1 className="font-bold text-base px-7 py-1 uppercase text-white text-center flex-auto bg-[#2474A6]">
              {blogData &&
                blogData.category === "Ai" &&
                "Artificial Intelligence"}
            </h1>
          </div>
          <div className="border-t-[3px] border-[#2474A6] flex-auto"></div>
        </div>
        <div className="mt-5 max-w-4xl xl:max-w-6xl mx-auto flex justify-around gap-10">
          <div>
            <div className="max-w-4xl">
              <h1 className="md:text-[3.2rem] text-2xl md:leading-[1.22] font-RoboCon font-bold">
                {blogData?.title}
              </h1>
            </div>
            <div className="max-w-4xl lg:border-r lg:pr-10">
              <div className="flex md:flex-row flex-col justify-between">
                <div className="mt-5 flex gap-3 items-center text-xs md:text-xl">
                  <p className="">
                    <span className="mr-1">
                      Published By: {blogData?.author}
                    </span>
                  </p>
                  <p className="border-r border-black md:pr-3">
                    Date:
                    {formatDateAndTime(blogData?.timestamp.toDate())}
                  </p>
                  <p className="border-r border-black md:pr-3">
                    Comments ({blogData && blogData.comments.length})
                  </p>
                  <p>Likes ({Object.keys(blogData?.likes || {}).length}) </p>
                </div>

                <ShareButtons
                  url={`https://mircrodesk.com/${encodeURIComponent(
                    blogData?.category.toLowerCase()
                  )}&id=${blogData?.id}`}
                  title={blogData?.title}
                  summary={"MircoDesk Blog"}
                />
              </div>
              <div className="mt-5">
                <img
                  alt="mainImage"
                  src={blogData?.thumbnail}
                  className="w-full h-full rounded-md"
                />
              </div>
              <div className="lg:max-w-2xl lg:mx-auto lg:mt-5 font-GeorgSerif">
                <div
                  className="custom"
                  dangerouslySetInnerHTML={{
                    __html: blogData && blogData?.blogData,
                  }}
                ></div>
              </div>
              {/* Comments */}

              <div className="lg:max-w-2xl mx-auto border-y">
                <div className="w-full mx-auto max-w-screen-xl p-2 md:flex md:items-center md:justify-between">
                  <div className="flex text-sm sm:text-center">
                    <Likes setOpen={setOpen} blogData={blogData} />
                    <button
                      type="button"
                      onClick={() => setShowComments(!showComments)}
                      className="px-3 py-2 ml-2 text-sm font-medium text-center inline-flex items-center border rounded-lg hover:opacity-75"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                        />
                      </svg>
                      Show all Comments ({blogData?.comments?.length})
                    </button>
                  </div>
                  <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
                    <li>
                      <CopyToClipboardButton
                        text={`https://mircrodesk.com/${encodeURIComponent(
                          blogData?.category.toLowerCase()
                        )}&id=${blogData?.id}`}
                      />
                    </li>
                  </ul>
                </div>
              </div>

              <section className="flex flex-col justify-center items-center">
                {showComments && (
                  <CommentsSection
                    blogData={blogData}
                    setSingleBlogData={setSingleBlogData}
                    setOpen={setOpen}
                  />
                )}
              </section>
            </div>
          </div>
          <div
            onClick={() => setAuthModal(true)}
            className="w-48 lg:mt-[154px] xl:mt-[132px] hidden lg:block "
          >
            <Link href="">
              <img src="/assets/dicbanner.png" className="w-full" />
            </Link>
          </div>
          {/* AuthFormModal */}

          <AuthForm authModal={authModal} setAuthModal={setAuthModal} />
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
