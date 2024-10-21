import React, { useState } from 'react';

const FollowButton = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };

  const buttonStyle = {
    padding: '0.5em 1em',
    fontSize: '12px',
    fontWeight: 'bold',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
    cursor: 'pointer',
    outline: 'none',
    border: '1px solid transparent',
  };

  const notFollowingStyle = {
    ...buttonStyle,
    backgroundColor: '#0095f6',
    color: 'white',
    borderColor: '#0095f6',
  };

  const notFollowingHoverStyle = {
    ...notFollowingStyle,
    backgroundColor: '#007bbd',
  };

  const followingStyle = {
    ...buttonStyle,
    backgroundColor: 'white',
    color: '#262626',
    borderColor: '#dbdbdb',
  };

  const followingHoverStyle = {
    ...followingStyle,
    backgroundColor: '#ffebe6',
    color: '#d9534f',
    borderColor: '#d9534f',
  };

  return (
    <button
      onClick={handleClick}
      style={isFollowing ? followingStyle : notFollowingStyle}
      onMouseOver={(e) => {
        if (isFollowing) {
          e.target.style.backgroundColor = followingHoverStyle.backgroundColor;
          e.target.style.color = followingHoverStyle.color;
          e.target.style.borderColor = followingHoverStyle.borderColor;
        } else {
          e.target.style.backgroundColor =
            notFollowingHoverStyle.backgroundColor;
        }
      }}
      onMouseOut={(e) => {
        if (isFollowing) {
          e.target.style.backgroundColor = followingStyle.backgroundColor;
          e.target.style.color = followingStyle.color;
          e.target.style.borderColor = followingStyle.borderColor;
        } else {
          e.target.style.backgroundColor = notFollowingStyle.backgroundColor;
        }
      }}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  );
};

export default FollowButton;
