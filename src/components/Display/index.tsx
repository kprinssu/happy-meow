import React, { useState, useEffect } from 'react';

import { useAppSelector } from '../../hooks';

import './Display.css';
import Grid from './Grid';


let frame = 0;

export default () => {
  const displayLayers = useAppSelector(state => state.keyboardDisplay);

  const width = 40;
  const height = 5;

  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout | null>(null);
  const [paused, setPaused] = useState(true);
  const [frames, setFrames] = useState(displayLayers.layers[0].frames[0].frame_RGB);
  const [speed, setSpeed] = useState(250);

  const nextFrame = () => {
    frame += 1;

    if (frame >= displayLayers.layers[0].frames.length) {
      frame = 0;
    }

    setFrames(displayLayers.layers[0].frames[frame].frame_RGB);
  };

  const playAnimation = (): NodeJS.Timeout => {
    return setInterval(() => {
      nextFrame();
    }, speed);
  };

  const startAnimation = () => {
    const ref = playAnimation();
    setIntervalRef(ref);
  };

  const clearAnimation = () => {
    if (intervalRef !== null) {
      clearInterval(intervalRef);
    }
    setIntervalRef(null);
  };

  const handlePausePlay = () => {
    setPaused(!paused);

    if (paused) {
      clearAnimation();
    }

    if (!paused) {
      startAnimation();
    }
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const speed = 100 - parseInt(event.target.value);

    setSpeed(speed);
    clearAnimation();
    startAnimation();
  };

  useEffect(() => {
    handlePausePlay();
  }, []);

  return (
    <div className="display-editor my-0 mx-auto w-full" data-testid="display-editor">
      <Grid frames={frames} frameNumber={frame} />
      <button onClick={() => handlePausePlay()} data-testid="display-pause-play">{paused ? 'Pause' : 'Play'}</button>
      <input type="range" name="play-speed" min="1" max="100" data-testid="display-speed-slider" onChange={handleSpeedChange} />
    </div>
  );
};
