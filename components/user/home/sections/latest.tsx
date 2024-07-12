"use client";
import Link from "next/link";
import Image from "next/image";

import { formatDateAndTime } from "@/utils/dateTime";
import { BlogPost } from "@/helpers/types/types";

const Latest = ({ latestBlogs, loading }: any) => {
  if (loading) {
    return "Loading";
  }
  if (!loading && latestBlogs.length === 0) {
    return "No Latest Blogs";
  }
  return (
    <div className="lg:grid grid-cols-3 gap-10 px-5 pt-5">
      {!loading &&
        latestBlogs.map((latest: BlogPost, index: number) => (
          <Link
            key={index}
            href={`/${latest.category.toLowerCase()}/${latest?.title
              .split(" ")
              .join("_")}`}
          >
            <div className="text-lg flex justify-left items-center border-b p-2">
              <div className="relative border rounded-md overflow-hidden  w-28 h-14">
                <Image
                  src={latest.thumbnail}
                  layout="fill"
                  alt="blog-thumbnail"
                />
              </div>
              <div className="w-full ml-2">
                <p className="hover:text-gray-600 truncate lg:w-full md:w-full sm:w-56 w-56">
                  {latest.title}
                </p>
                <p className="font-bold">
                  {formatDateAndTime(latest?.timestamp.toDate())}
                </p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Latest;
