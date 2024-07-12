'use client';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

import { db, storage } from '@/config/firebaseConfig';
import BlogModal from './addblog/modal/modal';
import SideBar from './sideBar';
import SideBarModal from './sideModal';
import {
  BsFillMenuButtonWideFill,
  BsMenuButtonWide,
  BsMenuButtonWideFill,
} from 'react-icons/bs';

interface Props {
  children: React.ReactNode;
}
const AdminLayout = ({ children }: Props) => {
  const router = useRouter();
  const { data } = useSession();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState<any>(null);

  const [thumbnailImageURL, setThumbnailImageURL] = useState<
    string | ArrayBuffer | null
  >(null);
  const [blogFormData, setBloFormgData] = useState({
    title: '',
    author: 'Mircrodesk Staff',
    category: '',
  });

  let admin = data?.user?.name;
  admin = admin?.charAt(0);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setThumbnailImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setThumbnailImageURL(reader?.result);
    };
    reader.readAsDataURL(file);
  };

  const createDocument = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      const newCollectionRef = collection(db, 'blogs');
      const storageRef = ref(storage, 'images/' + thumbnailImage?.name);
      const imageSnapshot = await uploadBytes(storageRef, thumbnailImage);
      const imageUrl = await getDownloadURL(imageSnapshot.ref);

      const res = await addDoc(newCollectionRef, {
        ...blogFormData,
        timestamp: serverTimestamp(),
        status: 'draft',
        thumbnail: imageUrl,
        views: 0,
        reply: [],
        comments: [],
      });
      if (res.id) {
        setLoading(false);
        router.replace(`/doc/${res.id}`);
        setBlogOpen(false);
      }
    } catch (error) {
      console.error('Error adding data to Firestore:', error);
    } finally {
    }
  };

  return (
    <>
      <header className="h-[4.3rem] border-b border-gray-300 bg-gray-50 sticky top-0 px-5 flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <h3 className="text-[#2474A6] font-bold text-2xl font-VarelaMain">
            Mircrodesk Blogs
          </h3>
          <Link href={'/'} target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </Link>
        </div>
        <div className="header-content flex justify-between items-center h-full">
          <div className="flex justify-between md:justify-normal items-center w-full md:w-0 gap-4">
            {/* Admin Menu Start */}
            <div className="lg:hidden block">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center outline-none justify-center rounded-md p-3 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <BsFillMenuButtonWideFill />
              </button>

              {/* Sidebar Modal for Mobile View */}
              <SideBarModal
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                setBlogOpen={setBlogOpen}
              />
            </div>
            {/* Admin Menu End */}
          </div>
          <div className="md:block hidden">
            <div className="flex items-center gap-5 text-[#2474A6]">
              <button
                className="uppercase flex justify-center items-center text-xs gap-2 bg-[#2474A6] px-5 text-white p-2 rounded-3xl"
                onClick={() => setBlogOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span>New Post</span>
              </button>
              <div className="flex items-center gap-2">
                <div className="relative w-9 h-9 overflow-hidden bg-gray-300 rounded-full text-gray-900 text-2xl flex justify-center items-center">
                  <span>{admin}</span>
                </div>
                <h4 className="capitalize">{data?.user?.name}</h4>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="flex">
        <SideBar />

        {/* Table Data */}
        <main className="main flex flex-col flex-grow">
          <div className="bg-gray-50">
            <div className=" lg:h-[calc(100vh-68.8px)] h-screen overflow-auto overflow-x-auto w-screen lg:w-full">
              {children}
            </div>
          </div>
        </main>
      </div>
      <BlogModal
        open={blogOpen}
        setOpen={setBlogOpen}
        setTitle={setTitle}
        title={title}
        createDocument={createDocument}
        setBloFormgData={setBloFormgData}
        handleImageChange={handleImageChange}
        thumbnailImageURL={thumbnailImageURL}
        loading={loading}
      />
    </>
  );
};
export default AdminLayout;
