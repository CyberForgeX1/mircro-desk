"use client";
import { LatestLoading } from '@/utils/loadingSkeleton';
import { BlogPost } from "@/helpers/types/types";
import MyContext from '@/context/createContext';
import { useContext, useEffect, useState } from 'react';
import LatestCard from './latestcard/latestCard';

const LatestMain = () => {
  const { blogData, loading }: any = useContext(MyContext);
  const [latestData, setLatestData] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (blogData) {
      const publishedPosts = blogData.filter(
        (data: BlogPost) => data.status === 'publish'
      );

      const sortedPosts = publishedPosts.sort(
        (a: BlogPost, b: BlogPost) =>
          b.timestamp.toDate().getTime() - a.timestamp.toDate().getTime()
      );

      const latestPosts = sortedPosts.slice(0, 6);
      setLatestData(latestPosts);
    }
  }, [blogData]);
  return (
    <section className="mx-5">
      <div className="flex gap-x-3 items-center w-full">
        <div className="border-t-8 border-[#2474A6] flex-auto"></div>
        <div>
          <h1 className="font-bold text-[48px] text-[#2474A6] text-center flex-auto">
            Latest Blogs
          </h1>
        </div>
        <div className="border-t-8 border-[#2474A6] flex-auto"></div>
      </div>
      <h1 className="text-[21px] lg:w-[50%] mx-auto text-center flex-none font-light lg:py-5 p-5">
        The hottest topic in tech in 2023: Here is everything you need to know
        about Blockchain, AI, Web Application and more.
      </h1>
      <div className="lg:grid grid-cols-3 gap-x-16 gap-y-16 mt-4">
        {loading
          ? [1, 2].map((data, index: number) => <LatestLoading key={index} />)
          : latestData.map((data: BlogPost, index: number) => (
              <LatestCard data={data} key={index} />
            ))}
      </div>
    </section>
  );
};

export default LatestMain;
