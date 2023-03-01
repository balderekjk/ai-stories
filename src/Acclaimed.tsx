// @ts-nocheck

import { useState, useEffect } from 'react';
import Reception from './Reception';

const Acclaimed = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const getAcclaimed = async () => {
      let response = await fetch(
        `${
          import.meta.env.VITE_BASE_SERVER_URL
        }collections/stories/records?sort=-likes,-created,-ratings&&filter=likes>0`
      );
      let data = await response.json();
      setStories(data.items);
    };
    getAcclaimed();
  }, []);

  return (
    <div className="main-content-wrapper">
      {stories.map((story, index) => {
        return (
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
            }}
            key={index}
          >
            <div className="story-box">{story.story.trim()}</div>
            <span style={{ marginTop: '8px' }}>
              Rating: +{story.likes} / Votes: {story.ratings}
            </span>
            {story.createdBy !== localStorage.getItem('rsgenkey') && (
              <Reception
                id={story.id}
                likes={story.likes}
                ratings={story.ratings}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Acclaimed;
