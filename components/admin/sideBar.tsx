import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const SideBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar w-72 h-[calc(100vh-68.8px)] lg:block hidden bg-gray-50 overflow-auto">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col justify-between px-4 py-6 border-r h-full">
          <ul className="flex flex-col w-full">
            <li className="my-px">
              <Link
                href="/admin"
                className={`flex flex-row items-center h-10 px-3 hover:text-[#2474A6] rounded-lg ${
                  pathname === '/admin'
                    ? 'bg-[#2474A6] hover:text-white text-white'
                    : ''
                }`}
              >
                <span className="flex items-center justify-center text-lg">
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </span>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li className="my-px mt-4">
              <Link
                href="/admin/published-blog"
                className={`flex flex-row items-center h-10 px-3 hover:text-[#2474A6] rounded-lg ${
                  pathname === '/admin/published-blog'
                    ? 'bg-[#2474A6] text-white hover:text-white'
                    : ''
                }`}
              >
                <span className="flex items-center justify-center text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </span>
                <span className="ml-3">Published Blogs</span>
              </Link>
            </li>
            <li className="my-px mt-4">
              <Link
                href="/admin/draft"
                className={`flex flex-row items-center h-10 px-3 hover:text-[#2474A6] rounded-lg ${
                  pathname === '/admin/draft'
                    ? 'bg-[#2474A6] text-white hover:text-white'
                    : ''
                }`}
              >
                <span className="flex items-center justify-center text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </span>
                <span className="ml-3">Draft Blogs</span>
              </Link>
            </li>
          </ul>
          <div className="pb-5">
            <ul className="flex flex-col w-full">
              <li className="my-px">
                <Link
                  href=""
                  className="flex flex-row items-center h-10 px-3 rounded-lg text-red-600 hover:bg-red-600 hover:text-white"
                  onClick={() => signOut()}
                >
                  <span className="flex items-center justify-center">
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <span className="ml-3 uppercase text-lg">Log out</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
