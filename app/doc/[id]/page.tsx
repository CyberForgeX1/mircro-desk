"use client";
import { db } from '@/config/firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import TextEditor from "@/components/admin/addblog/textEditor";

const Page = ({ params: { id } }: any) => {
  const [data, setData] = useState<any>();

const getDataFromFirestore = async () => {
  try {
    const collectionRef = collection(db, 'blogs');
    const querySnapshot = await getDocs(collectionRef);

    const data: any = [];

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    const singleData = data.filter((data: any) => data.id == id);

    return singleData;
  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
    return [];
  }
};

useEffect(() => {
  getDataFromFirestore().then((result) => {
    setData(result);
  });
}, []);
return (
  <div>
    <header className="flex justify-between items-center p-3 pb-1">
      <Link href="/add-blog" className="cursor-pointer">
        <Image
          width={500}
          height={500}
          src="/assets/file.png"
          className="w-10 h-10"
          alt=""
        />
      </Link>
      <div className="flex-grow px-2">
        <h2>{data && data[0]?.title}</h2>
      </div>
    </header>
    {data && data.length > 0 && <TextEditor id={id} data={data[0]} />}
  </div>
);
};

export default Page;