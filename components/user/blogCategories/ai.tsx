'use client';
import { useEffect, useState, useContext } from 'react';
import MyContext from '@/context/createContext';
import { AiBlockChain } from '@/utils/loadingSkeleton';
import BlogCategory from '@/components/user/blogcategory/blogCategory';
import { BlogPost } from '@/helpers/types/types';

const Ai = () => {
  const { blogData, loading }: any = useContext(MyContext);
  const [publishloading, setPublishLoading] = useState<boolean>(true);
  const [publishData, setPublishData] = useState<BlogPost[]>([]);

  useEffect(() => {
    const data = blogData.filter(
      (data: BlogPost) => data.status === 'publish' && data.category === 'Ai'
    );
    setPublishData(data);
    setPublishLoading(false);
  }, [blogData]);
  return (
    <section>
      <div className="flex gap-x-3 items-center w-full">
        <div className="border-t-8 border-[#2474A6] flex-auto"></div>
        <div>
          <h1 className="font-bold text-[48px] text-[#2474A6] text-center flex-auto">
            Artificial Intelligence
          </h1>
        </div>
        <div className="border-t-8 border-[#2474A6] flex-auto"></div>
      </div>
      <h1 className="text-[21px] lg:w-[50%] mx-auto text-center flex-none font-light lg:py-5 p-5">
        The hottest topic in tech in 2023: Here is everything you need to know
        about ChatGPT, Bard, Midjourney, Dall-E and more.
      </h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 items-start md:gap-16 max-w-7xl mx-auto lg:py-5 p-5">
        {loading || publishloading ? (
          <AiBlockChain />
        ) : (
          <BlogCategory data={publishData} />
        )}
      </div>
    </section>
  );
};

export default Ai;
