import Image from 'next/image';

const Comments = ({
  comment,
  blogData,
  handleIsOpen,
  index,
  doReply,
  replies,
  handleReplyIsOpen,
}: any) => {
  const dateFormater = (timestamp: any) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;
    return formattedDate;
  };

  return (
    <div className="border-b p-2">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-1">
          {comment?.profilePic ? (
            <Image
              width={25}
              height={25}
              className="rounded-full"
              src={comment?.profilePic}
              alt="user-profile-pic"
            />
          ) : (
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
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          )}
          {/* <img src={comment.profilePic} alt="" /> */}
          <p className="text-sm text-gray-900 font-semibold">{comment.name}</p>
          <p className="text-sm text-gray-600">
            <time>{dateFormater(comment.time)}</time>
          </p>
        </div>
        <button
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
          type="button"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>
        {/* Dropdown menu */}
        <div className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow">
          <ul className="py-1 text-sm text-gray-700 ">
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100 ">
                Edit
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100 ">
                Remove
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                Report
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <p className="text-gray-500">{comment.comment}</p>
      <div className="flex gap-6">
        <div className="flex items-center mt-4 space-x-4">
          <button
            onClick={() => handleReplyIsOpen(!replies.isOpen, index)}
            type="button"
            className="flex items-center text-sm text-gray-500 hover:underline font-medium"
          >
            <svg
              className="mr-1.5 w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
              />
            </svg>
            {
              blogData.reply.filter(
                (data: any) => data.commentId === comment.id
              ).length
            }{' '}
            Replies
          </button>
        </div>
        <div className="flex items-center mt-4 space-x-4">
          <button
            onClick={() => handleIsOpen(!doReply.isOpen, index, comment.id)}
            type="button"
            className="flex items-center text-sm text-gray-500 hover:underline font-medium"
          >
            <svg
              className="mr-1.5 w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
              />
            </svg>
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
