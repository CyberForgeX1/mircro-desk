"use client";
import Image from "next/image";
import { useContext, useEffect, useMemo, useState } from 'react';
import MyContext from '@/context/createContext';
import { BlogPost } from '@/helpers/types/types';
import { TrendingLoadingSkeleton } from '@/utils/loadingSkeleton';

const AdminDashboard = () => {
  const { blogData, loading }: any = useContext(MyContext);
  const [trending, setTrending] = useState<BlogPost[] | null>(null);
  const [trendingLoading, setTrendingLoading] = useState<boolean>(true);

  const publishedPosts = useMemo(
    () => blogData.filter((post: BlogPost) => post.status == 'publish'),
    [blogData]
  );

  useEffect(() => {
    const trendingData = publishedPosts.sort(
      (a: BlogPost, b: BlogPost) => b.views - a.views
    );
    const topTrendingData = trendingData.slice(0, 6);
    setTrending(topTrendingData);
    setTrendingLoading(false);
  }, [publishedPosts]);

  return (
    <div className="lg:grid grid-cols-1">
      <div className="px-5">
        <div className="py-5">
          <h4 className="text-2xl text-gray-400 italic pb-5">Popular Post</h4>
          <div className="flex flex-col gap-7">
            {trendingLoading ? (
              [1, 2, 3, 4, 5, 6].map((data, index) => (
                <TrendingLoadingSkeleton key={index} />
              ))
            ) : trending && trending.length > 0 ? (
              trending?.map((post: BlogPost, index: number) => {
                const { thumbnail, title, views, comments, likes } = post;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div>
                      <Image
                        src={thumbnail}
                        width={150}
                        height={150}
                        alt="Post"
                        className="rounded-md"
                      />
                    </div>
                    <div className="text-2xl">
                      <h1 className="text-[#2474A6]">{title}</h1>
                      <p className="text-sm text-gray-400">{`${views} Views . ${
                        comments?.length
                      } Comments . Likes ${
                        Object.keys(likes || {}).length
                      }`}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>No Trending Post</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
