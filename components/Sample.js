import React from 'react';

function Sample({ genreList }) {
  return (
    <div className="text-2xl text-white">
      {Array.from(genreList).map((val) => {
        return <p>{JSON.stringify(val)}</p>;
      })}
    </div>
  );
}

export default Sample;
