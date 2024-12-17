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
  const [imgSrc, setImgSrc] = useState(sr); // Initialize with provided source

  useEffect(() => {
    let isMounted = true; // Avoid state updates on unmounted components

    const condImg = userFallback
      ? '/others/userFallback.webp'
      : '/others/postFallback.jpg';

    const checkImage = async () => {
      try {
        // If sr is falsy, immediately set fallback image
        if (!sr) {
          setImgSrc(condImg);
          return;
        }

        // Check if the image URL is reachable
        const res = await fetch(sr, { method: 'HEAD' }); // Using HEAD method for performance
        if (isMounted) {
          // If the image is not valid (non-OK status), set the fallback image
          if (!res.ok) {
            setImgSrc(condImg);
          } else {
            setImgSrc(sr); // Set the original image URL if valid
          }
        }
      } catch (error) {
        if (isMounted) {
          setImgSrc(condImg); // Set fallback on error (e.g., network failure)
        }
      }
    };

    // Call the function to check the image validity
    checkImage();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, [sr, userFallback]); // Rerun when sr or userFallback changes

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
    />
  );
}

export default FallbackImage;
