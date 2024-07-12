import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from 'react-share';
import { FacebookIcon, XIcon, LinkedinIcon, WhatsappIcon } from 'react-share';

interface Props {
  url: string;
  title: string;
  summary: string;
}
const ShareButtons = ({ url, title, summary }: Props) => {
  return (
    <div className="mt-5 flex gap-6 items-center text-3xl text-[#2474A6]">
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <XIcon size={32} round />
      </TwitterShareButton>

      <LinkedinShareButton url={url} title={title} summary={summary}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButtons;
