"use client";
import MyContext from '@/context/createContext';
import { useEffect, useState, useContext } from "react";
import BlogDetail from '@/components/user/blogDetail';
import { handleViewsCount } from '@/utils/countView';
import { usePathname } from "next/navigation";

const Page = () => {
  const pathname = usePathname();

  const blogTitle = pathname.split('&')[1].split('=')[1];
  const [singleblogData, setSingleBlogData] = useState<any>();
  const { blogData, loading }: any = useContext(MyContext);

  useEffect(() => {
    const data = blogData.find(
      (data: any) => data.title === decodeURIComponent(blogTitle)
    );
    setSingleBlogData(data);
    handleViewsCount(data);
  }, [blogData]);

  return (
    <BlogDetail
      blogData={singleblogData}
      setSingleBlogData={setSingleBlogData}
      loading={loading}
    />
  );
};

export default Page;
