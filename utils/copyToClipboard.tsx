import { useState } from 'react';

interface CopyToClipboardButtonProps {
  text: string;
}

const CopyToClipboardButton = ({ text }: CopyToClipboardButtonProps) => {
  const [isClicked, click] = useState(false);

  async function copyToClipboard() {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }

      click(true);
      setTimeout(() => {
        click(false);
      }, 1000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  return (
    <button
      onClick={copyToClipboard}
      className="  inline-block cursor-pointer rounded-[3px] bg-[#9064b2] px-[10px]  py-[5px] text-[12px] font-semibold leading-[20px] text-white"
    >
      {isClicked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3.5}
          stroke="#2474A6"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="#000000"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
        </>
      )}
    </button>
  );
};

export default CopyToClipboardButton;
