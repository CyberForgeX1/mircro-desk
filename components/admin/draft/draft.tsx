"use client";
import { useContext, useEffect, useState } from 'react';
import { formatDateAndTime } from '@/utils/dateTime';
import { deleteDoc, doc } from 'firebase/firestore';
import MyContext from '@/context/createContext';
import { db } from '@/config/firebaseConfig';
import Link from 'next/link';

const Draft = () => {
  const { blogData, loading }: any = useContext(MyContext);
  const [unpublishedData, setUnpublishedData] = useState<any>([]);
  const [clipBoardLoading, SetClipBoardLoading] = useState({
    isLoading: false,
    index: null as null | number,
  });
  useEffect(() => {
    const data = blogData.filter((data: any) => data.status === 'draft');
    setUnpublishedData(data);
  }, [blogData]);

  const handleDeleteData = async (id: any) => {
    const documentReference = doc(db, 'blogs', id);
    try {
      await deleteDoc(documentReference);
      alert('Document with ID deleted successfully!' + id);
      const filterDeletedData = unpublishedData.filter(
        (data: any) => data.id !== id
      );
      setUnpublishedData(filterDeletedData);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const copyClickBoard = async (value: string, index: number) => {
    SetClipBoardLoading((prev) => ({ ...prev, isLoading: true, index: index }));
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error('Unable to copy text to clipboard', err);
    }
    setTimeout(() => {
      SetClipBoardLoading((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }, 2000);
  };
  return (
    <div>
      <>
        {/* Header */}
        <div className="flex justify-between w-full p-7">
          <h1 className="md:text-3xl text-2xl font-extrabold text-gray-400 font">
            Draft Blogs
          </h1>
        </div>
        {/* Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-7 lg:mx-8 my-3">
          <table className="w-full text-sm text-gray-500 text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Title
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Publish On
                </th>
                <th scope="col" className="px-4 py-3">
                  Author
                </th>
                <th scope="col" className="px-4 py-3">
                  Copy URL
                </th>
                <th scope="col" className="px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {loading ? (
                <tr>
                  <td>Loading...</td>
                </tr>
              ) : unpublishedData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-xl py-2">
                    No Data
                  </td>
                </tr>
              ) : (
                unpublishedData &&
                unpublishedData.map((post: any, index: number) => {
                  const { id, title, status, timestamp, author } = post;
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-4">{title}</td>
                      <td className="px-4 py-4 capitalize">{status}</td>
                      <td className="px-4 py-4">
                        {formatDateAndTime(timestamp.toDate())}
                      </td>
                      <td className="px-4 py-4">{author}</td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center">
                          <div className="flex justify-center items-center py-1 px-2">
                            {clipBoardLoading.isLoading &&
                            clipBoardLoading.index === index ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4 text-green-600"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4 text-zinc-600 cursor-pointer"
                                onClick={() =>
                                  copyClickBoard(
                                    `https://mircrodesk.com/&id=${id}`,
                                    index
                                  )
                                }
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-4">
                          <Link href={`/doc/${id}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5 text-green-500 cursor-pointer"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </Link>
                          <button onClick={() => handleDeleteData(id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5 text-red-600"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
};

export default Draft;
