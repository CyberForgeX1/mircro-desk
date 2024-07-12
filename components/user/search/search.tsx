'use client';
import { formatDateAndTime } from '@/utils/dateTime';
import { useContext, useEffect, useRef, useState } from 'react';
import MyContext from '@/context/createContext';
import Link from 'next/link';
import Image from 'next/image';

const Search = () => {
  const { blogData, loading }: any = useContext(MyContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const filteredBlogs = blogData.filter(
      (blog: any) =>
        (blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.blogData.toLowerCase().includes(searchQuery.toLowerCase())) &&
        blog.status === 'publish'
    );

    setSearchResults(filteredBlogs);
  }, [searchQuery, blogData]);

  return (
    <div className="w-[80%] mx-auto mt-10">
      <form>
        <div>
          <h4 className="text-[#2474A6] text-2xl">Search For</h4>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border-b border-gray-300 outline-none"
            placeholder="Search for blogs"
            required
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>
      <div className="pt-6">
        <h4 className="text-xl font-bold">
          More Recent Stories from Mircrodesk{' '}
          <span className="text-gray-400 font-light">
            {searchResults.length} results
          </span>
        </h4>
      </div>
      <div className="">
        {searchResults.map((data: any, index: any) => {
          const {
            title,
            thumbnail,
            blogData,
            category,
            timestamp,
            views,
            author,
          } = data;
          return (
            <Link
              key={index}
              href={`/${encodeURIComponent(category.toLowerCase())}&id=${
                data.id
              }`}
              className="flex flex-col my-2 items-start lg:items-center md:items-center bg-white border-b border-gray-200 md:flex-row md:max-w-xl hover:bg-gray-100"
            >
              <div className="relative rounded-md overflow-hidden w-full sm:w-48 md:w-48 sm:h-24 md:h-24 h-32">
                <Image src={thumbnail} layout="fill" alt="blog-thumbnail" />
              </div>
              <div className="flex flex-col justify-between py-4 lg:px-4 md:px-4">
                <h5 className="mb-2 text-2xl font-bold tracking-tight ">
                  {title}
                </h5>
                <TruncatedDiv blogData={blogData} />
                <div className="flex">
                  <p className="text-[#222222] font-bold text-[12px] py-2">
                    Published By: {author}
                  </p>
                  <p className="pl-2 text-[12px] py-2 hidden lg:block">
                    {data && formatDateAndTime(timestamp.toDate())}
                  </p>
                  <p className="inline-flex items-center ml-2">
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
                    <span className="text-[#222222] text-sm pl-1">
                      {views} Views
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Search;

const TruncatedDiv = ({ blogData }: any) => {
  const divRef = useRef(null);
  const [truncatedContent, setTruncatedContent] = useState<any | undefined>();

  useEffect(() => {
    // Use DOMParser to parse the HTML string
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(blogData, 'text/html');

    // Find the first non-empty <p> tag
    const firstPElement = Array.from(parsedHtml.querySelectorAll('p')).find(
      (p) => p.textContent && p.textContent.trim() !== ''
    );

    // Get the content of the first non-empty <p> tag
    const pContent = firstPElement?.innerHTML;

    // Truncate the content if the <p> tag has any text
    if (pContent && pContent.trim() !== '') {
      const maxCharacters = 150; // Adjust as needed
      const truncatedText =
        pContent.length > maxCharacters
          ? pContent.substring(0, maxCharacters) + '...'
          : pContent;

      setTruncatedContent(truncatedText);
    } else {
      setTruncatedContent(undefined);
    }
  }, [blogData]);

  return (
    <div
      ref={divRef}
      className="font-normal text-gray-700 truncate lg:w-96 md:w-96 sm:w-64 w-64"
      dangerouslySetInnerHTML={{
        __html: truncatedContent,
      }}
    ></div>
  );
};


