import Image from "next/image";
import Link from "next/link";

const Card = ({ data }: any) => {
  return (
    <Link
      href={`/${data.category.split(" ").join("-").toLowerCase()}/${data.title
        .split(" ")
        .join("_")}`}
    >
      <div className="bg-white flex flex-col rounded-md">
        <div className="h-40">
          <Image
            width={500}
            height={500}
            alt="image"
            src={data.thumbnail}
            className="w-full h-full rounded-md"
            priority
          />
        </div>
        <div className="p-2">
          <p className="text-gray-900 font-semibold text-lg hover:text-[#666666] leading-snug block truncate">
            {data.title}
          </p>
          <div className="flex gap-x-4">
            <p className="text-[#222222] font-bold text-[16px]">
              {data.author}
            </p>
            <p className="inline-flex text-[#222222] items-center">
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
              <span className="text-sm pl-1">{data?.views} Views</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
