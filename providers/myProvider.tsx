'use client';
import { ReactNode, useEffect, useState } from 'react';
import MyContext from '../context/createContext';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db, facebookAuth, provider } from '@/config/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

interface MyProviderProps {
  children: ReactNode;
}

const MyProvider = ({ children }: MyProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState<any>([]);
  const [user, setUser] = useState<any>();

  const getDataFromFirestore = async () => {
    try {
      const collectionRef = collection(db, 'blogs');
      const querySnapshot = await getDocs(collectionRef);
      const data: any = [];

      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      const filterData = data.filter((item: any) => item.status === 'publish');
      setLoading(false);
      return data;
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
      return [];
    }
  };
  useEffect(() => {
    getDataFromFirestore().then((result) => {
      setBlogData(result);
    });
  }, []);

  // firebase Authentication
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      setUser(res.user);
    } catch (error) {
      console.error('Sign in Error', error);
    }
  };
  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const signInWithFb = async () => {
    try {
      await signInWithPopup(auth, facebookAuth);
    } catch (error) {
      console.error('Sign in Error', error);
    }
  };
  return (
    <MyContext.Provider
      value={{
        blogData,
        loading,
        signInWithGoogle,
        signOut,
        signInWithFb,
        user,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
