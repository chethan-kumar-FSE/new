'use client';
import Cookies from 'js-cookie';
import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { useInView, InView } from 'react-intersection-observer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Backdrop from '@/share/backdrop';

import { ShareButtons } from '../Share';
import Feed from './feed/Feed';
import { feedsServices } from '@/services/feedsService';
import { useBackdropContext } from '@/context/backdrop';
import { genreService } from '@/services/genreService';
import WidgetTemplates from './widgetTemplates/WidgetTemplates';
import { WIDGETS_INTERVALS } from '@/utils/constant';
import { userService } from '@/services/userService';

export default function InitialFeeds({
  initialFeedsOnLoad = [],
  isFromGenre,
  genreId,
  lang,
  isFromUserProf,
}) {
  const [feedsPosts, setFeedsPosts] = useState([...initialFeedsOnLoad]);
  const [lastId, setLastId] = useState(
    initialFeedsOnLoad[initialFeedsOnLoad.length - 1]?.id
  );

  const postIdRef = useRef(null);

  const [postDetailsOnShare, setPostDetailsOnShare] = useState({
    postId: '',
    postUrl: '',
    postImage: '',
  });

  const [nextPage, setNextPage] = useState(2);
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of the element is in view
  });

  const { data: session } = useSession();

  const { toggleBackdropStatus } = useBackdropContext();

  const router = useRouter();
  //memoise the value from cookies
  const userPrefferedLangFromCookies = useMemo(() => {
    const cookieData = lang || 'en';

    return cookieData;
  }, [lang]);
  const commonUserId = Cookies.get('commonUserId');

  const updateUrlWithPostID = (postID, urlString) => {
    console.log('loggeer', postID);
    // Get the current path and split it based on '/'

    if (isFromGenre) {
      const postIdEvent = new CustomEvent(`postIDUpdated-${postID}`, {
        detail: { postID },
      });
      window.dispatchEvent(postIdEvent);
      return;
    }
    let pathSegments = window.location.pathname.split('/');

    // Ensure the base path is clear and consistent
    let basePath = pathSegments[0]; // Root or base path

    // Define the language segment if needed
    if (userPrefferedLangFromCookies !== 'en') {
      const lang = userPrefferedLangFromCookies;
      basePath += `/${lang}`;
    }

    if (postID) {
      const newUrl = `${basePath}/${urlString}-p${postID}`;
      window.history.replaceState({}, '', newUrl);

      const postIdEvent = new CustomEvent(`postIDUpdated-${postID}`, {
        detail: { postID },
      });
      console.log('dispatching');
      window.dispatchEvent(postIdEvent);
      //  lastPostID = postID;
    } else {
      console.log('Resetting to default path');
      window.history.replaceState({}, '', basePath === '' ? '/' : basePath);
    }
  };

  const setInView = (inView, entry, id, index, urlString) => {
    console.log('id', id);
    if (inView) {
      updateUrlWithPostID(id, urlString);
    } else if (index === 0 && entry && entry.boundingClientRect.top >= 0) {
      // If the first post is scrolled back out of view from the top, reset the URL to /feeds
      updateUrlWithPostID(null);
    }
  };

  useEffect(() => {
    (async () => {
      if (inView) {
        let feeds;

        try {
          if (isFromGenre) {
            feeds = await genreService.getFeedsOnGenre({
              requestBody: {
                lang: lang,
                page: nextPage,
                genre_id: genreId,
                last_id: lastId,
              },
            });
          } else if (isFromUserProf) {
            console.log('getting inside it', commonUserId);
            feeds = await userService.getCurrentUserPosts({
              requestBody: {
                user_id: commonUserId,
                page: nextPage - 1,
              },
            });
          } else {
            feeds = await feedsServices.getFeeds({
              requestBody: {
                lang: userPrefferedLangFromCookies,
                page: nextPage,
                last_id: lastId,
                user_id: commonUserId,
              },
            });
          }
          setLastId(feeds[feeds.length - 1]?.id);
          setFeedsPosts((prevFeedsPosts) => [...prevFeedsPosts, ...feeds]);
          setNextPage((prevPage) => prevPage + 1);
        } catch (err) {
          console.log('caught error');
          return router.replace('/');
        }
      }
    })();
  }, [
    inView,
    commonUserId,
    genreId,
    ,
    isFromGenre,
    isFromUserProf,
    lang,
    lastId,
    nextPage,
    router,
    userPrefferedLangFromCookies,
  ]);

  const handleOnShare = useCallback(
    ({ postId, urlString, postImage, newsTitle }) => {
      toggleBackdropStatus();

      setPostDetailsOnShare({ postId, urlString, postImage, newsTitle });
    },
    [toggleBackdropStatus]
  );

  return (
    <div style={{ maxWidth: '440px' }}>
      {/*  <DynamicHead
        title={'different type'}
        description={'descriptiont o enghance the '}
        imageUrl={''}
      /> */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
          height: 'auto',
          position: 'relative',
          padding: '1em',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: '1em',
            overflowX: 'hidden',
            position: 'relative',
          }}
        >
          {feedsPosts.map(
            (
              {
                id,
                image_link,
                news_title,
                user_image,
                user_name,
                share_image_link,
                url_string,
                secure_user_id,
                view_count,
                like_count,
                comment_count,
                share_count,
                download_count,
                save_count,
                news_language,
                user: { userlike, usershare, usersave },
              },
              index
            ) => {
              console.log('newalnga', news_language);
              if (isFromUserProf) {
                return (
                  <>
                    {index !== 0 && index % WIDGETS_INTERVALS === 0 && (
                      <WidgetTemplates lang={lang} />
                    )}
                    <Feed
                      index={index}
                      id={id}
                      ref={ref}
                      imageLink={image_link}
                      userImage={user_image}
                      userName={user_name}
                      shareImageLink={share_image_link}
                      newsTitle={news_title}
                      handleOnShare={handleOnShare}
                      urlString={url_string}
                      secureUserId={secure_user_id}
                      viewCount={view_count}
                      likeCount={like_count}
                      commentCount={comment_count}
                      shareCount={share_count}
                      downloadCount={download_count}
                      saveCount={save_count}
                      newsLanguage={news_language}
                      postIdRef={postIdRef}
                      userLike={userlike}
                      userShare={usershare}
                      userSave={usersave}
                    />
                  </>
                );
              }
              return (
                <InView
                  onChange={(inview, entry) =>
                    setInView(inview, entry, id, index, url_string)
                  }
                  threshold={0.8}
                  key={id}
                >
                  {({ ref }) => (
                    <>
                      {index !== 0 && index % WIDGETS_INTERVALS === 0 && (
                        <WidgetTemplates lang={lang} />
                      )}
                      <Feed
                        index={index}
                        id={id}
                        ref={ref}
                        imageLink={image_link}
                        userImage={user_image}
                        userName={user_name}
                        shareImageLink={share_image_link}
                        newsTitle={news_title}
                        handleOnShare={handleOnShare}
                        secureUserId={secure_user_id}
                        viewCount={view_count}
                        likeCount={like_count}
                        commentCount={comment_count}
                        shareCount={share_count}
                        downloadCount={download_count}
                        saveCount={save_count}
                        newsLanguage={news_language}
                        urlString={url_string}
                        postIdRef={postIdRef}
                        userLike={userlike}
                        userShare={usershare}
                        userSave={usersave}
                      />
                    </>
                  )}
                </InView>
              );
            }
          )}
          <div
            ref={ref}
            style={{
              height: '100px',
              background: 'tranparent',
              position: 'absolute',
              bottom: '30%',
            }}
          ></div>
        </div>
      </div>
      <Backdrop>
        <ShareButtons postDetailsOnShare={postDetailsOnShare} />
      </Backdrop>
    </div>
  );
}
