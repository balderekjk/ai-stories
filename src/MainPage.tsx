// @ts-nocheck

import { useEffect, useState, useRef } from 'react';
import positiveT from './datalists/positive_traits.json';
import negativeT from './datalists/negative_traits.json';
import neutralT from './datalists/neutral_traits.json';
import jobs from './datalists/common_jobs.json';
import storyAdjectives from './datalists/story_descriptors.json';
import genres from './datalists/story_genres.json';
import './App.css';

function MainPage() {
  const [randomStory, setRandomStory] = useState('');
  const [timer, setTimer] = useState(25);
  const [reviewed, setReviewed] = useState(false);
  const readerRef = useRef();

  const randomize = (num: number) => {
    return Math.floor(Math.random() * num);
  };

  const createLocalId = () => {
    let random = randomize(2100000000);
    localStorage.setItem('rsgenkey', random.toString(36));
  };

  useEffect(() => {
    if (!localStorage.getItem('rsgenkey')) createLocalId();
    setRandomStory('');
    const getRandomStoryType = () => {
      let storyBuild = [];
      for (let i = 0; i < 2; i++) {
        let randomDescriptor = randomize(storyAdjectives.length);
        storyBuild.push(storyAdjectives[randomDescriptor].toLowerCase());
      }
      let randomGenreIdx = randomize(13);
      let randomGenre = genres[randomGenreIdx];
      let joined = storyBuild.join('and ') + ' ' + randomGenre;
      return joined;
    };

    const getRandomPerson = () => {
      let arr = [];
      let traits = [];
      for (let i = 0; i < 2; i++) {
        let random = randomize(2);
        arr.push(random);
      }
      for (let i = 0; i < arr.length; i++) {
        let traitIndex = -1;
        switch (arr[i]) {
          case 0:
            traitIndex = randomize(positiveT.length);
            traits.push(positiveT[traitIndex].toLowerCase());
            break;
          case 1:
            traitIndex = randomize(neutralT.length);
            traits.push(neutralT[traitIndex].toLowerCase());
          //   break;
          // case 2:
          //   traitIndex = randomize(neutralT.length);
          //   traits.push(neutralT[traitIndex].toLowerCase());
        }
      }
      let jobIndex = randomize(jobs.length);
      let randomJob = jobs[jobIndex];
      let joined = randomJob + ' who is both ' + traits.join(' and ');
      return joined;
    };

    const fetchGPT = (prompt) => {
      setTimer(25);
      if (
        localStorage.getItem('rsggotcha') &&
        localStorage.getItem('rsggotcha') > Math.floor(Date.now() / 1000)
      )
        return;
      fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: 'text-curie-001',
          prompt: prompt,
          temperature: 0.7,
          max_tokens: 420,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setRandomStory(data.choices[0].text);
          localStorage.setItem('rsggotcha', Math.floor(Date.now() / 1000) + 30);
        })
        .catch((error) => console.log(error));
    };

    let storyType = getRandomStoryType();
    let person = getRandomPerson();

    let story = `Write a ${storyType} of moderate length featuring a ${person}. The story should have a ridiculous conflict. The conflict should have an ending.`;
    fetchGPT(story);
  }, [reviewed]);

  useEffect(() => {
    if (timer === 0) {
      localStorage.removeItem('rsggotcha');
    }

    const time = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => {
      clearInterval(time);
    };
  }, [randomStory, timer]);

  const handleReview = async (vote: number) => {
    let localId = localStorage.getItem('rsgenkey');
    setReviewed(!reviewed);
    await fetch(
      `${import.meta.env.VITE_BASE_SERVER_URL}collections/stories/records`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          story: randomStory,
          likes: vote,
          ratings: 1,
          createdBy: localId,
        }),
      }
    );
    readerRef.current.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <h2>Random Story Generator</h2>
      <h4 style={{ marginBottom: '20px' }}>Powered by OpenAI</h4>
      <div className="main-content-wrapper">
        <div className="story-box" ref={readerRef}>
          {randomStory ? (
            randomStory.trim()
          ) : (
            <div>
              Please wait. Random story is generating. This can take up to{' '}
              <span style={{ color: 'darkblue' }}>
                <strong>10 seconds</strong>
              </span>
              . If you refreshed page before time reached zero, you will need to
              refresh again when time reaches zero.
            </div>
          )}
        </div>
        <span style={{ marginTop: '8px' }}>
          Vote to View New Story: {timer}
        </span>
        {randomStory && timer === 0 && (
          <div className="reception-box">
            <button
              onClick={() => handleReview(1)}
              disabled={timer > 0}
              className={`${timer > 0 ? 'initial-btn' : 'like-btn'}`}
            >
              &#128077;
            </button>
            <button
              onClick={() => handleReview(-1)}
              disabled={timer > 0}
              className={`${timer > 0 ? 'initial-btn' : 'dislike-btn'}`}
            >
              &#128078;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
