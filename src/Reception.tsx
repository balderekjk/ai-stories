// @ts-nocheck

import { useState } from 'react';

const Reception = ({ id, likes, ratings }) => {
  const [isReviewed, setIsReviewed] = useState(false);

  const handleReview = async (vote) => {
    setIsReviewed(true);
    await fetch(
      `${
        import.meta.env.VITE_BASE_SERVER_URL
      }collections/stories/records/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likes: likes + vote,
          ratings: ratings + 1,
        }),
      }
    );
  };

  return (
    <>
      {!isReviewed && (
        <div className="reception-box">
          <button
            onClick={() => handleReview(1)}
            disabled={isReviewed}
            className="like-btn"
          >
            &#128077;
          </button>
          <button
            onClick={() => handleReview(-1)}
            disabled={isReviewed}
            className="dislike-btn"
          >
            &#128078;
          </button>
        </div>
      )}
    </>
  );
};

export default Reception;
