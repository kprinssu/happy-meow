import React, { useState, useEffect } from 'react';

import { useAppSelector } from '../../hooks';

import './Display.css';
import Grid from './Grid';


let frame = 0;
let currentLayer = 0;

export default () => {
  const displayLayers = useAppSelector(state => state.keyboardDisplay);

  const width = 40;
  const height = 5;

  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout | null>(null);
  const [paused, setPaused] = useState(true);
  const [frames, setFrames] = useState(displayLayers.layers[currentLayer].frames[0].frame_RGB);
  const [speed, setSpeed] = useState(250);

  const nextFrame = () => {
    frame += 1;

    if (frame >= displayLayers.layers[currentLayer].frames.length) {
      frame = 0;
    }

    setFrames(displayLayers.layers[currentLayer].frames[frame].frame_RGB);
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

  const changeLayer = (layer: number) => {
    currentLayer = layer;
    clearAnimation();
    startAnimation();
  };

  useEffect(() => {
    handlePausePlay();
  }, []);

  return (
    <div className="display-editor my-0 mx-auto w-full" data-testid="display-editor">
      <span data-testid="display-layer">Layer {currentLayer + 1}</span>
      <Grid frames={frames} frameNumber={frame} />
      <button onClick={() => handlePausePlay()} data-testid="display-pause-play">{paused ? 'Pause' : 'Play'}</button>
      <input type="range" name="play-speed" min="1" max="100" data-testid="display-speed-slider" onChange={handleSpeedChange} />

      <ul>
        <li onClick={() => changeLayer(0)} data-testid="display-layer-frame-1">Frame: 1</li>
        <li onClick={() => changeLayer(1)} data-testid="display-layer-frame-2">Frame: 2</li>
        <li onClick={() => changeLayer(2)} data-testid="display-layer-frame-3">Frame: 3</li>
      </ul>
    </div>
  );
};
