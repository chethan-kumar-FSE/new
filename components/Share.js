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

export const ShareButtons = ({ postDetailsOnShare }) => {
  const { toggleBackdropStatus } = useBackdropContext();

  const { postId, postImage, urlString, newsTitle, newsLanguage } =
    postDetailsOnShare;
  const postUrl = window.location.hostname; // Get the current URL of the post
   const protocol = window.location.protocol;
  //const link = `${protocol}//${postUrl}/${urlString}-p${postId}`;
  const link = postUrl;

  const userId = Cookies.get('userId');
  //let link = `${postUrl}/${urlString}-p${postId}`;

  const handleOnClipboardCopy = async () => {
    toggleBackdropStatus();
    await navigator.clipboard?.writeText(link);

    notify({ message: 'Link copied to clipboard' });
  };

  const handleOnEmbeddedCopy = async () => {
    toggleBackdropStatus();
    const embeddedCode = getEmbeddedCode({ postId: postId });
    await navigator.clipboard?.writeText(embeddedCode);

    notify({ message: 'Embedded code copied to clipboard' });
  };

  const handleOnSharingOnMedia = async ({ type }) => {
    // const message = `${newsTitle}\n${postUrl}`; // Message to send with the link

   /*  const response = await feedsServices.getUpdatedShareCount({
      requestBody: {
        articleid: postId,
        sharecount: 1,
        userid: userId,
        lang: newsLanguage,
      },
    });
    console.log('responsebody for sharecount', response); */

    let text = newsTitle + '  ' + link + ' Hitzfeed by Oneindia';
    let url;
    if (type == 'wa') {
      url = `https://api.whatsapp.com/send?text=${text}`;
    }
    if (type == 'fb') {
      url = 'https://www.facebook.com/sharer/sharer.php?u=' + link;
    }
    if (type == 'tw') {
      url = 'https://twitter.com/intent/tweet?text=' + text;
    }
    if (type == 'te') {
      url = 'https://telegram.me/share/url?url=' + link + '&text=' + newsTitle;
    }
    if (type == 'in') {
      url = 'https://www.instagram.com/?url=' + link;
    }
    if (type == 'li') {
      url = 'http://www.linkedin.com/shareArticle?mini=true&url=' + link;
    }
    if (type == 'ml') {
      url = 'mailto:?subject=' + newsTitle + '&body=' + text;
    }
    window.open(url, '_blank');
  };
  return (
    <div
      style={{
        width: '100%',
        background: '#262322',
        padding: '4em 0',
        position: 'fixed',
        bottom: '60px',
        zIndex: 100,
        transition: 'bottom 5s ease-in-out', // Corrected property
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          width: '300px',
          rowGap: '3em',
          margin: '0 auto',
        }}
      >
        <div
          style={{ textAlign: 'center', cursor: 'pointer' }}
          onClick={() => handleOnClipboardCopy()}
        >
          <Image
            src={
              'https://www.hitzfeed.com/trends/media/flashcard/copy-icon.svg'
            }
            alt="sometin"
            width={45}
            height={45}
          />
          <IconTagName tagName={'Copy Link'} />
        </div>
        <FacebookShareButton
          url={'https://github.com/next-share'}
          quote={
            'next-share is a social share buttons for your next React apps.'
          }
          hashtag={'#nextshare'}
        >
          <FacebookIcon
            size={SOCIAL_ICON_SIZE}
            style={{ borderRadius: '0.4em' }}
            onClick={() => handleOnSharingOnMedia({ type: 'fb' })}
          />
          <IconTagName tagName={'Facebook'} />
        </FacebookShareButton>
        <TelegramShareButton>
          <TelegramIcon
            size={SOCIAL_ICON_SIZE}
            style={{ borderRadius: '0.4em' }}
            onClick={() => handleOnSharingOnMedia({ type: 'te' })}
          />
          <IconTagName tagName={'Telegram'} />
        </TelegramShareButton>
        <TwitterShareButton>
          <TwitterIcon
            size={SOCIAL_ICON_SIZE}
            style={{ borderRadius: '0.4em' }}
            onClick={() => handleOnSharingOnMedia({ type: 'tw' })}
          />
          <IconTagName tagName={'Twitter'} />
        </TwitterShareButton>
        <WhatsappShareButton>
          <WhatsappIcon
            size={SOCIAL_ICON_SIZE}
            style={{ borderRadius: '0.4em' }}
            onClick={() => handleOnSharingOnMedia({ type: 'wa' })}
          />
          <IconTagName tagName={'Whatsapp'} />
        </WhatsappShareButton>

        <LinkedinShareButton>
          <LinkedinIcon
            size={SOCIAL_ICON_SIZE}
            style={{ borderRadius: '0.4em' }}
            onClick={() => handleOnSharingOnMedia({ type: 'li' })}
          />
          <IconTagName tagName={'LinkedIn'} />
        </LinkedinShareButton>
        <EmailShareButton
          url={'https://github.com/next-share'}
          subject={'Next Share'}
          body="body"
        >
          <EmailIcon
            size={SOCIAL_ICON_SIZE}
            style={{ borderRadius: '0.4em' }}
            onClick={() => handleOnSharingOnMedia({ type: 'ml' })}
          />
          <IconTagName tagName={'Email'} />
        </EmailShareButton>
        <div
          style={{ textAlign: 'center', cursor: 'pointer' }}
          onClick={() => handleOnEmbeddedCopy()}
        >
          <Image
            src={
              'https://www.hitzfeed.com/trends/media/flashcard/embed-icon.svg'
            }
            alt="sometin"
            width={45}
            height={45}
          />
          <IconTagName tagName={'Embed'} />
        </div>
      </div>

      <RxCross1
        style={{
          fontSize: '2em',
          position: 'absolute',
          right: '10px',
          color: 'white',
          top: '10px',
          cursor: 'pointer',
        }}
        onClick={() => toggleBackdropStatus()}
      />
    </div>
  );
};

const IconTagName = ({ tagName }) => {
  return (
    <p style={{ color: '#d2d5d9', fontSize: '10px', marginTop: '3px' }}>
      {tagName}
    </p>
  );
};
