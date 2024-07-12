import { db } from '@/config/firebaseConfig';
import MyContext from '@/context/createContext';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';

interface Props {
  blogData: any;
  setOpen: any;
}
const Likes = ({ setOpen, blogData }: Props) => {
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const { user }: any = useContext(MyContext);
  const handleLike = async () => {
    if (!user) {
      setOpen(true);
      return;
    }
    try {
      const blogRef = doc(db, 'blogs', blogData.id);
      let updatedLikes = blogData.likes || {};

      if (hasLiked) {
        // User has already liked the post, so remove their like
        delete updatedLikes[user.uid];
      } else {
        // User has not liked the post, add their like
        updatedLikes[user.uid] = true;
      }

      await updateDoc(blogRef, { likes: updatedLikes });
      setHasLiked(!hasLiked);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  useEffect(() => {
    if (user && blogData.likes && blogData.likes[user.uid]) {
      setHasLiked(true);
    }
  }, [user, blogData]);
  return (
    <button
      type="button"
      onClick={handleLike}
      className="px-3 py-2 text-sm font-medium text-center inline-flex items-center border rounded-lg hover:opacity-75"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-5 h-5 mr-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
        />
      </svg>

      {hasLiked ? 'Unlike' : 'Like'}
    </button>
  );
};

export default Likes;
