import { db } from '@/config/firebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';

export const handleDeleteData = async (id: any) => {
  const documentReference = doc(db, 'blogs', id);
  try {
    await deleteDoc(documentReference);
    alert('Document with ID deleted successfully!');
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};
