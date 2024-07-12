"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { LatestUploadSkeleton } from "@/utils/loadingSkeleton";
import { formatDateAndTime } from "@/utils/dateTime";
import { BlogPost } from "@/helpers/types/types";
import MyContext from "@/context/createContext";
import TopTrending from "./sections/trending";
import Latest from "./sections/latest";

const HomeIndex: React.FC = () => {
  const { blogData, loading }: any = useContext(MyContext);
  const [trendingBlogs, setTrendingBlogs] = useState<BlogPost[] | null>(null);
  const [latestBlogs, setLatestBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (blogData) {
      const publishedPosts = blogData.filter(
        (data: BlogPost) => data.status === "publish"
      );

      const sortedPosts = publishedPosts.sort(
        (a: BlogPost, b: BlogPost) =>
          b.timestamp.toDate().getTime() - a.timestamp.toDate().getTime()
      );

      const latestPosts = sortedPosts.slice(0, 6);
      setLatestBlogs(latestPosts);

      const trendingData = publishedPosts.sort(
        (a: BlogPost, b: BlogPost) => b.views - a.views
      );
      const topTrendingData = trendingData.slice(0, 6);
      setTrendingBlogs(topTrendingData);
    }
  }, [blogData]);

  return (
    <div>
      <div className="lg:grid grid-cols-8 lg:gap-10 px-5 flex flex-col mt-16">
        {loading && <LatestUploadSkeleton />}

        {/* Main Blog */}
        {!loading && latestBlogs.length > 0 && (
          <div className="col-span-6 lg:order-1 order-1 h-full overflow-hidden">
            <Link
              // href={`/${encodeURIComponent(
              //   latestBlogs[0]?.category.toLowerCase()
              // )}&title=${latestBlogs[0]?.title}`}
              href={`/${latestBlogs[0]?.category.toLowerCase()}/${latestBlogs[0]?.title
                .split(" ")
                .join("_")}`}
            >
              <h2 className="font-extrabold lg:text-5xl text-2xl text-gray-900 md:text-3xl pb-2 font-RoboCon hover:text-gray-600">
                {latestBlogs[0]?.title}
              </h2>
            </Link>
            <div className="md:flex pb-5 gap-x-5">
              <p>
                Publish Date:{" "}
                {formatDateAndTime(latestBlogs[0]?.timestamp.toDate())}
              </p>
              <p>Author: {latestBlogs[0]?.author}</p>
            </div>
            <Link
              href={`/${latestBlogs[0]?.category.toLowerCase()}/${latestBlogs[0]?.title
                .split(" ")
                .join("_")}`}
              className="w-full h-full"
            >
              <Image
                width={1000}
                height={100}
                src={latestBlogs[0]?.thumbnail}
                alt="trend"
                className="rounded hover:opacity-80 hover:transition hover:ease-in-out hover:delay-150"
              />
            </Link>
          </div>
        )}

        {/* Trending Blogs */}
        <div className="col-span-2 lg:order-2 order-3 lg:pt-0 pt-8 overflow-hidden">
          <h1 className="font-semibold pb-3 text-xl">Trending</h1>
          <TopTrending trendingBlogs={trendingBlogs} loading={loading} />
        </div>
      </div>

      {/* Latest BLogs */}
      <section className="lg:pt-14 pt-5">
        <div className="px-5 flex justify-between items-center">
          <h1 className="font-bold lg:pb-6 lg:text-5xl text-3xl md:text-4xl">
            Latest
          </h1>
          <Link
            href="/latest"
            className="cursor-pointer hover:underline text-gray-500"
          >
            View All
          </Link>
        </div>
        <Latest latestBlogs={latestBlogs} loading={loading} />
      </section>
    </div>
  );
};

export default HomeIndex;
