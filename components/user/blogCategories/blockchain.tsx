'use client';
import { useContext, useEffect, useState } from 'react';
import MyContext from '@/context/createContext';
import { AiBlockChain } from '@/utils/loadingSkeleton';
import BlogCategory from '@/components/user/blogcategory/blogCategory';
import { BlogPost } from '@/helpers/types/types';

const Blockchain = () => {
  const { blogData, loading }: any = useContext(MyContext);
  const [blogLoading, setBlogLoading] = useState<boolean>(true);
  const [blockChainData, setBlockChain] = useState<BlogPost[]>([]);

  useEffect(() => {
    const data = blogData.filter(
      (data: BlogPost) =>
        data.status === 'publish' && data.category === 'Blockchain'
    );
    setBlockChain(data);
    setBlogLoading(false);
  }, [blogData]);
  return (
    <section>
      <div className="flex gap-x-3 items-center w-full">
        <div className="border-t-8 border-[#2474A6] flex-auto"></div>
        <div>
          <h1 className="font-bold text-[48px] text-[#2474A6] text-center flex-auto">
            Blockchain
          </h1>
        </div>
        <div className="border-t-8 border-[#2474A6] flex-auto"></div>
      </div>
      <h1 className="text-[21px] lg:w-[50%] mx-auto text-center flex-none font-light lg:py-5 p-5">
        The hottest topic in tech in 2023: Here is everything you need to know
        about Blockchain, NFT, Smart Contract, Decentralized and more.
      </h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 md:gap-16 max-w-7xl mx-auto lg:py-5 p-5">
        {loading || blogLoading ? (
          <AiBlockChain />
        ) : (
          <BlogCategory data={blockChainData} />
        )}
      </div>
    </section>
  );
};

export default Blockchain;
