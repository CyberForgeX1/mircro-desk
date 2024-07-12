"use client";
import MyContext from "@/context/createContext";
import { useEffect, useState, useContext } from "react";
import BlogDetail from "@/components/user/blogDetail";
import { handleViewsCount } from "@/utils/countView";
import { usePathname } from "next/navigation";

const Page = () => {
  const pathname = usePathname();

  const blogTitle = pathname.split("_").join(" ").split("/")[2];
  console.log("blogTitle------>", blogTitle);
  const [singleblogData, setSingleBlogData] = useState<any>();
  const { blogData, loading }: any = useContext(MyContext);

  useEffect(() => {
    const data = blogData.find((data: any) => data.title === blogTitle);
    console.log("data----->", data);
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
