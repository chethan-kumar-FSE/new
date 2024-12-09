'use client';
import Cookies from 'js-cookie';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useInView, InView } from 'react-intersection-observer';
import Feed from './feed/Feed';
import { feedsServices } from '@/services/feedsService';
import { useBackdropContext } from '@/context/backdrop';
import { genreService } from '@/services/genreService';
import WidgetTemplates from './widgetTemplates/WidgetTemplates';
import { WIDGETS_INTERVALS } from '@/utils/constant';
import { userService } from '@/services/userService';
import { checkConnectionAndNotify } from '@/utils/network';
import { notify } from '@/utils/Toast';
import dynamic from 'next/dynamic';
import db from '@/lib/db';

const BackdropDynamicImport = dynamic(() => import('@/share/backdrop'), {
  ssr: false,
});
const ShareButtonsDynamicImport = dynamic(() => import('../Share'), {
  ssr: false,
});

export default function InitialFeeds({
  initialFeedsOnLoad = [],
  isFromGenre,
  genreId,
  lang,
  isFromUserProf,
  userCommonId,
  isFromTrending,
  isFromSaved,
  currentPostId,
}) {
  console.log('ffeeds', initialFeedsOnLoad);
  const [feedsPosts, setFeedsPosts] = useState([...initialFeedsOnLoad]);
  const [lastTimeStamp, setLastTimeStamp] = useState(
    initialFeedsOnLoad[initialFeedsOnLoad?.length - 1]?.timestamp
  );

  const [trackIfRetrievedFromDB, setTrackIfRetrievedFromDB] = useState({
    commonFeeds: false,
  });

  const [lastId, setLastId] = useState(
    initialFeedsOnLoad[initialFeedsOnLoad?.length - 1]?.last_id
  );

  const postIdRef = useRef(null);

  const [postDetailsOnShare, setPostDetailsOnShare] = useState({
    postId: '',
    postUrl: '',
    postImage: '',
  });

  const [nextPage, setNextPage] = useState(2);
  const { ref, inView } = useInView({
    threshold: 0.7, // Trigger when 10% of the element is in view
  });

  const { toggleBackdropStatus } = useBackdropContext();

  //memoise the value from cookies
  const commonUserId = Cookies.get('commonUserId');

  const updateUrlWithPostID = (postID, urlString) => {
    // Get the current path and split it based on '/'

    if (isFromGenre || isFromTrending | isFromSaved) {
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
    basePath = lang && lang !== 'en' ? (basePath += `/${lang}`) : basePath;

    if (postID) {
      const newUrl = `${basePath}/${urlString}-p${postID}`;
      window.history.replaceState({}, '', newUrl);

      const postIdEvent = new CustomEvent(`postIDUpdated-${postID}`, {
        detail: { postID },
      });
      window.dispatchEvent(postIdEvent);
      //  lastPostID = postID;
    } else {
      window.history.replaceState({}, '', basePath === '' ? '/' : basePath);
    }
  };

  const setInView = (inView, entry, id, index, urlString) => {
    if (inView) {
      updateUrlWithPostID(id, urlString);
    } else if (index === 0 && entry && entry.boundingClientRect.top >= 0) {
      // If the first post is scrolled back out of view from the top, reset the URL to /feeds
      updateUrlWithPostID(null);
    }
  };

  const handleOnFeedsUpdate = ({ result, type }) => {
    setFeedsPosts((prevPosts) => [...prevPosts, ...result]);

    setTrackIfRetrievedFromDB((prevState) => {
      return {
        ...prevState,
        [type]: true,
      };
    });
  };

  const handleOnFeedsFromIDB = ({ type, IDBdata }) => {
    const result = IDBdata.filter((idb) => idb.type === type);
    console.log('currentResuult', result);
    const currentLanguage = Cookies.get('language');
    console.log('alnad0', result[0].records[currentLanguage], currentLanguage);
    return result[0].records[currentLanguage];
  };

  const handleOnFeedsError = async ({ errType }) => {
    const IDBdata = await db.responseDataForOfflineAccess.toArray();
    console.log('EDB', IDBdata, errType);
    if (!IDBdata.length) return;
    switch (errType) {
      case 'commonFeedsError': {
        const feedType = 'commonFeeds';
        if (trackIfRetrievedFromDB[feedType]) return;
        console.log('getting in side');
        const result = handleOnFeedsFromIDB({ type: feedType, IDBdata });
        console.log('result', result);
        handleOnFeedsUpdate({ result, type: feedType });
        break;
      }
      //future improvmeents
      /* case 'genreFeedsError': {
        const feedType = 'genreFeeds';
        if (trackIfRetrievedFromDB[feedType]) return;
        const result = handleOnFeedsFromIDB({ type: feedType, IDBdata });
        handleOnFeedsUpdate({ result, type: feedType });
        break;
      } */
      default: {
        console.log('default ---');
      }
    }
  };

  const handleOnIDBCheck = async ({ feedType, feedsToAdd }) => {
    const isRecordPresent = await db.responseDataForOfflineAccess
      .where('type')
      .equals(feedType)
      .first(); // Get the first (and ideally only) record
    const currentLanguage = Cookies.get('language');
    const insertObject = {
      type: feedType,
      records: {
        [currentLanguage]: feedsToAdd,
      },
    };
    if (isRecordPresent) {
      let isCurrentLanguageRecordPresent =
        isRecordPresent?.records[currentLanguage];
      if (isCurrentLanguageRecordPresent) {
        if (isCurrentLanguageRecordPresent.length > 40) {
          isCurrentLanguageRecordPresent.splice(0, 20);
        }
        const currentRecords = [
          ...isCurrentLanguageRecordPresent,
          ...feedsToAdd,
        ];
        const uniqueRecords = Array.from(
          new Map(currentRecords.map((item) => [item.id, item])).values()
        );
        insertObject['records'] = {
          ...isRecordPresent['records'],
          [currentLanguage]: uniqueRecords,
        };

        await db.responseDataForOfflineAccess['put'](insertObject);

        return;
      }
      insertObject['records'] = {
        ...isRecordPresent['records'],
        [currentLanguage]: feedsToAdd,
      };
      await db.responseDataForOfflineAccess['put'](insertObject);
      return;
    }
    await db.responseDataForOfflineAccess['add'](insertObject);
  };

  useEffect(() => {
    (async () => {
      let isCancelled = false;
      let errType;
      if (inView) {
        let feeds;

        try {
          if (isFromSaved) {
            feeds = await userService.getUserProfileSavedCards({
              requestBody: {
                user_id: commonUserId,
                timestamp: lastTimeStamp,
              },
            });
          } else if (isFromTrending) {
            feeds = await feedsServices.getTrendingFeeds({
              requestBody: {
                lang: lang || 'en',
                page: nextPage,
                last_id: lastId,
                user_id: commonUserId,
              },
            });
          } else if (isFromGenre) {
            feeds = await genreService.getFeedsOnGenre({
              requestBody: {
                lang: lang || 'en',
                page: nextPage,
                genre_id: genreId,
                last_id: lastId,
              },
            });
          } else if (isFromUserProf) {
            feeds = await userService.getCurrentUserPosts({
              requestBody: {
                user_id: userCommonId,
                page: nextPage - 1,
              },
            });
          } else {
            errType = 'commonFeedsError';
            feeds = await feedsServices.getFeeds({
              requestBody: {
                lang: lang || 'en',
                page: nextPage,
                last_id: lastId,
                user_id: commonUserId,
              },
            });
            if (navigator.onLine) {
              handleOnIDBCheck({ feedType: 'commonFeeds', feedsToAdd: feeds });
            }
          }
          setFeedsPosts((prevFeeds) => [...prevFeeds, ...feeds]);
          setLastId(feeds[feeds.length - 1]?.last_id);
          setNextPage((prevPage) => prevPage + 1);
        } catch (err) {
          console.log('error', errType);
          handleOnFeedsError({ errType: errType });
        }
      }
      return () => {
        isCancelled = true;
      };
    })();
  }, [inView]);

  const handleOnShare = useCallback(
    ({ postId, urlString, postImage, newsTitle, newsLanguage }) => {
      if (!checkConnectionAndNotify(notify)) return;

      toggleBackdropStatus({ boolVal: true });

      setPostDetailsOnShare({
        postId,
        urlString,
        postImage,
        newsTitle,
        newsLanguage,
      });
    },
    []
  );

  return (
    <>
      <div className="flex flex-col items-center w-[100%]  gap-[1em] relative">
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
              channel_id,
              comment_count,
              share_count,
              download_count,
              save_count,
              news_language,
              user: { userlike, usershare, usersave, userfollow },
            },
            index
          ) => {
            if (index > 0 && id == currentPostId && isFromUserProf) return null;
            let feedPost = (ref) => (
              <Feed
                index={index}
                id={id}
                ref={ref ?? null}
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
                userFollow={userfollow}
                channelId={channel_id}
              />
            );
            if (isFromUserProf || isFromSaved) {
              return (
                <React.Fragment key={id}>
                  {index !== 0 && index % WIDGETS_INTERVALS === 0 && (
                    <WidgetTemplates lang={lang} />
                  )}
                  {feedPost()}
                </React.Fragment>
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
                  <React.Fragment>
                    {index !== 0 && index % WIDGETS_INTERVALS === 0 && (
                      <WidgetTemplates lang={lang} />
                    )}
                    {feedPost(ref)}
                  </React.Fragment>
                )}
              </InView>
            );
          }
        )}
        <div
          ref={ref}
          className="h-[100px] w-[50px] z-20 bg-transparent absolute bottom-[30%]"
        ></div>
      </div>
      <BackdropDynamicImport>
        <ShareButtonsDynamicImport postDetailsOnShare={postDetailsOnShare} />
      </BackdropDynamicImport>
    </>
  );
}
