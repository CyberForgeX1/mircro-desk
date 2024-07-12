import { BlogPost } from "@/helpers/types/types";
import { formatDateAndTime } from "@/utils/dateTime";
import Image from "next/image";
import Link from "next/link";

interface LatestCardProps {
  data: BlogPost;
}

const LatestCard = ({ data }: LatestCardProps) => {
  return (
    <div className="col-span-2">
      <Link
        // href={`/${encodeURIComponent(data.category.toLowerCase())}&title=${
        //   data.title
        // }`}
        href={`/${data.category.toLowerCase()}/${data?.title
          .split(" ")
          .join("_")}`}
      >
        <div className="lg:h-[70vh] md:h-[70vh] sm:h-40 h-40 w-full">
          <Image
            src={data.thumbnail}
            className="object-cover w-full h-full rounded-md hover:opacity-80 hover:transition hover:ease-in-out hover:delay-150"
            width={500}
            height={500}
            alt="images"
            priority
          />
        </div>
        <div className="mt-8">
          <h1 className="font-bold text-xl md:text-2xl pb-3">{data?.title}</h1>

          <div className="flex items-center gap-16 text-xs md:text-base ">
            <p className="font-semibold md:mb-0 mb-2 ">
              Published By:
              {data?.author ? data?.author : "Admin"}
            </p>
            <p className="md:mb-0 mb-2 hidden lg:block">
              Publish Date: {formatDateAndTime(data?.timestamp?.toDate())}
            </p>
            <p className="inline-flex items-center">
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
              <span className="text-[#666666] font-normal pl-1">
                {data?.views} views
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LatestCard;
