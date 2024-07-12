import Image from "next/image";
import Link from "next/link";
import React from "react";
import Card from "./blogCard";
import { BlogPost } from "@/helpers/types/types";
import { formatDateAndTime } from "@/utils/dateTime";

interface Props {
  data: Array<BlogPost>;
}
const BlogCategory = ({ data }: Props) => {
  if (data?.length === 0) {
    return <div>No Data</div>;
  }
  return (
    <>
      <div className="bg-white flex flex-col">
        <Link
          href={`/${data[0]?.category
            .split(" ")
            .join("-")
            .toLowerCase()}/${data[0]?.title.split(" ").join("_")}`}
        >
          <Image
            width={500}
            height={500}
            alt="image"
            src={data && data[0]?.thumbnail}
            className="w-full mb-3 rounded-md"
            priority={true}
          />
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-[28px] py-2 hover:text-[#666666] leading-normal">
              <h2>{data && data[0]?.title}</h2>
            </div>
            <div className="flex">
              <p className="text-[#222222] text-[16px] py-2">
                Published By: {data && data[0]?.author}
              </p>
              <p className="pl-2 text-[#222222] text-[16px] py-2 hidden lg:block">
                Date: {data && formatDateAndTime(data[0]?.timestamp?.toDate())}
              </p>
              <p className="inline-flex text-[#222222] items-center pl-2">
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
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm pl-1">
                  {data && data[0]?.views} Views
                </span>
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start lg:gap-x-16 gap-y-5">
        {data &&
          data.slice(1).map((elem: any, index: number) => {
            return <Card key={index} data={elem} />;
          })}
      </div>
    </>
  );
};

export default BlogCategory;
