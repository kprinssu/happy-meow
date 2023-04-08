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
  const [paused, setPaused] = useState(false);
  const [frames, setFrames] = useState(displayLayers.layers[0].frames[0].frame_RGB);

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
    }, 250);
  };

  const setupAnimation = () => {
    setPaused(!paused);

    if (paused) {
      if (intervalRef !== null) {
        clearInterval(intervalRef);
      }

      setIntervalRef(null);
    }

    if (!paused) {
      const ref = playAnimation();
      setIntervalRef(ref);
    }

  };

  useEffect(() => {
    setupAnimation();
  }, []);

  return (
    <div className="display-editor my-0 mx-auto w-full" data-testid="display-editor">
      <Grid frames={frames} frameNumber={frame} />
      <button onClick={() => setupAnimation()} data-testid="display-pause-play">{paused ? 'Pause' : 'Play'}</button>
      <input type="range" name="play-speed" />
    </div>
  );
};
