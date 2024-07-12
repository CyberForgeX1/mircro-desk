import { db } from '@/config/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const handleViewsCount = async (data: any) => {
  try {
    if (data) {
      const blogRef = doc(db, 'blogs', data.id);
      const docSnap: any = await getDoc(blogRef);
      if (docSnap != undefined) {
        const currentViews = docSnap.data().views;
        const updatedViews = currentViews + 1;
        await updateDoc(blogRef, { views: updatedViews });
      }
    }
  } catch (error) {
    console.error('Error updating data in Firestore:', error);
  }
};
