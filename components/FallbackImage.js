'use client';
import React, { useEffect, useState } from 'react';

function FallbackImage({
  sr,
  alt = 'Image',
  width,
  height,
  userFallback,
  className,
  loading,
}) {
  const [imgSrc, setImgSrc] = useState(sr);

  useEffect(() => {
    let isMounted = true; // Avoid state updates on unmounted components

    (async () => {
      const condImg = userFallback
        ? '/others/userFallback.webp'
        : '/others/postFallback.jpg';
      try {
        if (!sr) {
          setImgSrc(condImg);
          return;
        }

        // Check if the image URL is reachable
        const res = await fetch(sr, { method: 'HEAD' });
        if (isMounted) {
          if (!res.ok) {
            setImgSrc(condImg);
          }
        }
      } catch (error) {
        if (isMounted) {
          setImgSrc(condImg);
        }
      }
    })();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, [sr]); // Rerun when `sr` changes

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      onerror="this.src='path/to/fallback-image.jpg';"
    />
  );
}

export default FallbackImage;
