// DynamicHead.js
import { useEffect } from 'react';

const DynamicHead = ({ title, description, imageUrl }) => {
  useEffect(() => {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    const ogImage = document.querySelector('meta[property="og:image"]');

    // Update the Open Graph metadata
    if (ogTitle) ogTitle.setAttribute('content', title);
    else {
      const newOgTitle = document.createElement('meta');
      newOgTitle.setAttribute('property', 'og:title');
      newOgTitle.setAttribute('content', title);
      document.head.appendChild(newOgTitle);
    }

    if (ogDescription) ogDescription.setAttribute('content', description);
    else {
      const newOgDescription = document.createElement('meta');
      newOgDescription.setAttribute('property', 'og:description');
      newOgDescription.setAttribute('content', description);
      document.head.appendChild(newOgDescription);
    }

    if (ogImage) ogImage.setAttribute('content', imageUrl);
    else {
      const newOgImage = document.createElement('meta');
      newOgImage.setAttribute('property', 'og:image');
      newOgImage.setAttribute('content', imageUrl);
      document.head.appendChild(newOgImage);
    }
  }, [title, description, imageUrl]);

  return null; // This component does not render anything
};

export default DynamicHead;
