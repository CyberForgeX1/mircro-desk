import React, { useContext, useState } from 'react';
import Comments from './comments';
import Reply from './reply';
import MyContext from '@/context/createContext';
import { generateRandomId } from '../../../utils/generateRandomId';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

interface Props {
  blogData: any;
  setSingleBlogData: any;
  setOpen: any;
}
const CommentsSection = ({ blogData, setOpen, setSingleBlogData }: Props) => {
  const [replyContent, setReplyContent] = useState<string>('');
  const [comment, setComments] = useState<string>('');
  const [commentId, setCommentId] = useState();
  const { user }: any = useContext(MyContext);
  const [replies, setReplies] = useState({
    index: null,
    isOpen: false,
  });
  const [doReply, setDoReply] = useState({
    index: null,
    isOpen: false,
  });

  const handleReplyIsOpen = (data: any, index: number) => {
    setReplies((prev: any) => ({ ...prev, index: index, isOpen: data }));
  };

  const handleIsOpen = (data: any, index: number, id: any) => {
    setDoReply((prev: any) => ({ ...prev, index: index, isOpen: data }));
    setCommentId(id);
  };
  const handleSubmitComments = async (e: any, data: any) => {
    e.preventDefault();

    if (!user) {
      setOpen(true);
      return;
    }
    try {
      const blogRef = doc(db, 'blogs', data.id);

      if (data != undefined) {
        const pushComment = {
          comment: comment,
          profilePic: user.photoURL,
          email: user.email,
          name: user.displayName,
          time: Date.now(),
          id: generateRandomId(),
        };

        const updatedComments = [...data.comments, pushComment];
        setSingleBlogData((prev: any) => ({
          ...prev,
          comments: [...data.comments, pushComment],
        }));
        await updateDoc(blogRef, { comments: updatedComments });
        setComments('');
      }
    } catch (error) {
      console.error('Error updating data in comment:', error);
    }
  };

  const handleSubmitReplys = async (e: any, data: any) => {
    e.preventDefault();
    if (!user) {
      setOpen(true);

      return;
    }
    try {
      const blogRef = doc(db, 'blogs', data.id);
      if (data != undefined) {
        const pushReply = {
          commentId: commentId,
          content: replyContent,
          profilePic: user.photoURL,
          email: user.email,
          name: user.displayName,
          time: Date.now(),
          id: generateRandomId(),
        };

        const updatedReply = [...data.reply, pushReply];
        setSingleBlogData((prev: any) => ({
          ...prev,
          reply: [...data.reply, pushReply],
        }));
        await updateDoc(blogRef, { reply: updatedReply });
        setReplyContent('');
        doReply.isOpen = false;
      }
    } catch (error) {
      console.error('Error updating data in reply:', error);
    }
  };

  const handleTextareaReply = (e: any) => {
    setReplyContent(e.target.value);
    adjustTextareaHeight(e.target);
  };
  const adjustTextareaHeight = (textarea: any) => {
    // Set the minimum height to 2 rows
    const minHeight =
      2 * parseFloat(window.getComputedStyle(textarea).lineHeight);
    textarea.style.height = minHeight + 'px';
    // Set the height to the scrollHeight if it's larger than the minimum height
    textarea.style.height = Math.max(minHeight, textarea.scrollHeight) + 'px';
  };
  const handleTextareaChange = (e: any) => {
    setComments(e.target.value);
    adjustTextareaHeight(e.target);
  };
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
          Comments {blogData && blogData.comments.length}
        </h2>
      </div>
      <form
        className="mb-6"
        onSubmit={(e) => handleSubmitComments(e, blogData)}
      >
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows={2}
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
            placeholder="Write a comment..."
            onChange={handleTextareaChange}
            required
            value={comment}
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-4 bg-blue-600 text-white text-xs font-medium text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
        >
          Post comment
        </button>
      </form>
      {blogData &&
        blogData.comments.reverse().map((comment: any, index: number) => (
          <article key={index} className="p-6 text-base bg-white rounded-lg">
            <Comments
              blogData={blogData}
              index={index}
              handleIsOpen={handleIsOpen}
              doReply={doReply}
              handleReplyIsOpen={handleReplyIsOpen}
              replies={replies}
              comment={comment}
            />
            {doReply.isOpen && doReply.index === index && (
              <form
                className="mb-6 mt-5"
                onSubmit={(e) => handleSubmitReplys(e, blogData)}
              >
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows={2}
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                    placeholder="Write a comment..."
                    required
                    onChange={handleTextareaReply}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 bg-blue-600 text-white text-xs font-medium text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
                >
                  Post comment
                </button>
              </form>
            )}
            {replies.isOpen &&
              replies.index === index &&
              blogData.reply.filter(
                (data: any) => data.commentId === comment.id
              ).length > 0 && (
                <div className="ml-8 mt-4">
                  {blogData.reply
                    .filter((data: any) => data.commentId === comment.id)
                    .map((data: any, index: number) => (
                      <Reply data={data} key={index} />
                    ))}
                </div>
              )}
          </article>
        ))}
    </div>
  );
};

export default CommentsSection;
