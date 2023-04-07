import React, { useState, useEffect } from 'react';

import { useAppSelector } from '../../hooks';

import './Display.css';
import Grid from './grid';

export default () => {
  const displayLayers = useAppSelector(state => state.keyboardDisplay);

  const width = 40;
  const height = 5;
  let tick = 0;

  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout | null>(-1);
  const [paused, setPaused] = useState(false);
  const [frames, setFrames] = useState(displayLayers.layers[0].frames[0].frame_RGB);

  const nextTick = () => {
    tick += 1;

    if (tick >= displayLayers.layers[0].frames.length) {
      tick = 0;
    }

    setFrames(displayLayers.layers[0].frames[tick].frame_RGB);
  };

  const playAnimation = (): number => {
    return setInterval(() => {
      nextTick();
    }, 250);
  };

  const setupAnimation = () => {
    setPaused(!paused);

    if (paused) {
      clearInterval(intervalRef);
      setIntervalRef(-1);
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
    <div className="display-editor">
      <Grid frames={frames} />
      <button onClick={() => setupAnimation()}>{paused ? 'Play' : 'Pause'}</button>
    </div>
  );
};
