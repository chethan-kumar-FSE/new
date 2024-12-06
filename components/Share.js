'use client';
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from 'next-share';
import { SOCIAL_ICON_SIZE } from '@/utils/constant';
import { RxCross1 } from 'react-icons/rx';
import { useBackdropContext } from '@/context/backdrop';
import { notify } from '@/utils/Toast';
import { getEmbeddedCode } from '@/utils/embeddedCode';
import Image from 'next/image';
import { feedsServices } from '@/services/feedsService';
import Cookies from 'js-cookie';

function ShareButtons({ postDetailsOnShare }) {
  const { toggleBackdropStatus } = useBackdropContext();

  const { postId, postImage, urlString, newsTitle, newsLanguage } =
    postDetailsOnShare;
  let language = Cookies.get('language');

  const postUrl = window.location.hostname;
  const protocol = window.location.protocol;

  let link = `${protocol}//${postUrl}/${urlString}-p${postId}`;
  if (language && language !== 'en') {
    link = `${protocol}//${postUrl}/${language}/${urlString}-p${postId}`;
  }
  const userId = Cookies.get('userId');

  const handleOnClipboardCopy = async () => {
    toggleBackdropStatus({ boolVal: true });
    await navigator.clipboard?.writeText(link);

    notify({ message: 'Link copied to clipboard' });
  };

  const handleOnEmbeddedCopy = async () => {
    toggleBackdropStatus({ boolVal: true });
    const embeddedCode = getEmbeddedCode({ postId: postId });
    await navigator.clipboard?.writeText(embeddedCode);

    notify({ message: 'Embedded code copied to clipboard' });
  };

  const handleOnSharingOnMedia = async ({ type }) => {
    let text = newsTitle + '  ' + link + ' Hitzfeed by Oneindia';
    let url;
    if (type === 'wa') {
      url = `https://api.whatsapp.com/send?text=${text}`;
    }
    if (type === 'fb') {
      url = 'https://www.facebook.com/sharer/sharer.php?u=' + link;
    }
    if (type === 'tw') {
      url = 'https://twitter.com/intent/tweet?text=' + text;
    }
    if (type === 'te') {
      url = 'https://telegram.me/share/url?url=' + link + '&text=' + newsTitle;
    }
    if (type === 'in') {
      url = 'https://www.instagram.com/?url=' + link;
    }
    if (type === 'li') {
      url = 'http://www.linkedin.com/shareArticle?mini=true&url=' + link;
    }
    if (type === 'ml') {
      url = 'mailto:?subject=' + newsTitle + '&body=' + text;
    }
    window.open(url, '_blank');
    toggleBackdropStatus({ boolVal: true });

    try {
      await feedsServices.getUpdatedShareCount({
        requestBody: {
          articleid: postId,
          sharecount: 1,
          userid: userId,
          lang: newsLanguage,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      className="w-full bg-[#262322] py-16 fixed bottom-0 z-50 transition-all duration-500 ease-in-out"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="grid grid-cols-4 gap-x-8 gap-y-12 w-72 mx-auto">
        {/* Copy Link Section */}
        <div
          className="text-center cursor-pointer flex flex-col items-center justify-center"
          onClick={handleOnClipboardCopy}
        >
          <Image
            src="/others/copyIcon.svg"
            alt="Copy Link"
            width={45}
            height={45}
            className="mx-auto"
          />
          <IconTagName tagName="Copy" />
        </div>

        {/* Facebook Share Section */}
        <FacebookShareButton url={link} quote={newsTitle} hashtag="#nextshare">
          <div className="flex flex-col items-center justify-center text-center">
            <FacebookIcon
              size={SOCIAL_ICON_SIZE}
              className="rounded-md"
              onClick={() => handleOnSharingOnMedia({ type: 'fb' })}
            />
            <IconTagName tagName="Facebook" />
          </div>
        </FacebookShareButton>

        {/* Telegram Share Section */}
        <TelegramShareButton>
          <div className="flex flex-col items-center justify-center text-center">
            <TelegramIcon
              size={SOCIAL_ICON_SIZE}
              className="rounded-md"
              onClick={() => handleOnSharingOnMedia({ type: 'te' })}
            />
            <IconTagName tagName="Telegram" />
          </div>
        </TelegramShareButton>

        {/* Twitter Share Section */}
        <TwitterShareButton>
          <div className="flex flex-col items-center justify-center text-center">
            <TwitterIcon
              size={SOCIAL_ICON_SIZE}
              className="rounded-md"
              onClick={() => handleOnSharingOnMedia({ type: 'tw' })}
            />
            <IconTagName tagName="Twitter" />
          </div>
        </TwitterShareButton>

        {/* WhatsApp Share Section */}
        <WhatsappShareButton>
          <div className="flex flex-col items-center justify-center text-center">
            <WhatsappIcon
              size={SOCIAL_ICON_SIZE}
              className="rounded-md"
              onClick={() => handleOnSharingOnMedia({ type: 'wa' })}
            />
            <IconTagName tagName="Whatsapp" />
          </div>
        </WhatsappShareButton>

        {/* LinkedIn Share Section */}
        <LinkedinShareButton>
          <div className="flex flex-col items-center justify-center text-center">
            <LinkedinIcon
              size={SOCIAL_ICON_SIZE}
              className="rounded-md"
              onClick={() => handleOnSharingOnMedia({ type: 'li' })}
            />
            <IconTagName tagName="LinkedIn" />
          </div>
        </LinkedinShareButton>

        {/* Email Share Section */}
        <EmailShareButton url={link} subject={newsTitle} body={newsTitle}>
          <div className="flex flex-col items-center justify-center text-center">
            <EmailIcon
              size={SOCIAL_ICON_SIZE}
              className="rounded-md"
              onClick={() => handleOnSharingOnMedia({ type: 'ml' })}
            />
            <IconTagName tagName="Email" />
          </div>
        </EmailShareButton>

        {/* Embed Section */}
        <div
          className="text-center cursor-pointer flex flex-col items-center justify-center"
          onClick={handleOnEmbeddedCopy}
        >
          <Image
            src="/others/embedIcon.svg"
            alt="Embed"
            width={45}
            height={45}
            className="mx-auto"
          />
          <IconTagName tagName="Embed" />
        </div>
      </div>

      <RxCross1
        className="text-white text-2xl absolute top-2 right-2 cursor-pointer"
        onClick={() => toggleBackdropStatus({ boolVal: false })}
      />
    </div>
  );
}
const IconTagName = ({ tagName }) => (
  <p className="text-[#d2d5d9] text-xs mt-2">{tagName}</p>
);
export default ShareButtons;
